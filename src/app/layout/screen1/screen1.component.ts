import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MetodosService } from '../../shared/services/Methods/metodos.service';
import Swal from 'sweetalert2';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';



export interface ElementosCliente {
  Id: string;
  Nombre: string;
  Direccion: string;
  ip: string;
  descripcion_TipoDisp: string;
  Id_TipoDispositivo: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: ElementosCliente[] = [];

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {

  constructor(private router: Router, protected MetodoServices: MetodosService, private fb: FormBuilder) {

  }



  displayedColumns = ['position', 'name', 'weight', 'symbol', 'IP', 'Eliminar'];
  dataSource;
  valuePicker;
  TotalClientes;
  TotalServicios;
  TotalPagos;
  cliente = [];
  Meses = [];
  dataSourceMes;
  loginForm: FormGroup;
  selectedValue: string;
  selectedValueMes: string;

  valueMes;
  valueClient;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  valueServicio;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
}

  ngOnInit() {
    this.loginForm = this.fb.group({
      fecha: new FormControl('', []),
      monto: new FormControl('', [])
    });
    this.Pagos();
    this.Clientes();
    this.MesesOn();



  }

  

  RegistrarPago() {

    const monto = this.loginForm.get('monto').value;
    const ArrayPago = {
      'Id_Mes_Pago': this.valueMes,
      'Monto': monto,
      'Fecha': new Date().toISOString(),
      'Id_Cliente_Pago': this.valueServicio
    };
    if (monto === '') {
      Swal.fire('Favor Llenar los campos');
    } else {
    this.MetodoServices.InsertPago(ArrayPago).subscribe(data => {
      console.log(data);

    });
    Swal.fire('Pago Registrado').then(()=> {
      window.location.reload();
    });

  }
  }

  changeMes(value) {
    this.valueMes = value;

    
}



Eliminar(Id){
  Swal.fire({
    title: 'Seguro Quiere Eliminar el Pago',
    text: "Desea Eliminar El Registro?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.value) {
      this.MetodoServices.DeletePago(Id).subscribe(page => {

      });
      
      Swal.fire(
        'Eliminado!',
        'El Pago a sido Eliminado',
        'success'
      ).then(() => 
      {
        window.location.reload();
      }
      );
    }
  })
  
}


changeCliente(value) {
  this.valueClient = value;
  for(var i=0; i < this.valuePicker.length; i++ ){
    if(this.valuePicker[i].Id == value){
  this.loginForm.patchValue(
    { 
      monto: this.valuePicker[i].Precio
    });

    this.valueServicio = this.valuePicker[i].Id_Servicio
  }
}

}

  MesesOn() {
    this.MetodoServices.getMonth().subscribe(
        data => {
            this.Meses = [];
            const datosMeses = Object.values(data);




            for (let i = 0; i < datosMeses.length; i++) {
                const newMeses = {
                    'Id_Mes': datosMeses[i].id_Mes,
                    'Mes':  datosMeses[i].descripcion_Meses

                                 };
                this.Meses = this.Meses.concat(newMeses);
            }
            this.dataSourceMes = this.Meses;

        },
        error => {

        }
      );
}



  Pagos() {
    this.MetodoServices.getPagos().subscribe(
        data => {
            this.cliente = [];
            const datosCliente = Object.values(data);

            const PagosPivote = datosCliente[0];
            const ServicioPivote = datosCliente[1];
            const ClientePivote = datosCliente[2];

            for (let i = 0; i < ClientePivote.length; i++) {
                const newCliente = {
                    'Id': ClientePivote[i].id_Cliente_Client,
                    'Nombre':  ClientePivote[i].nombre1,
                    'Servicio': '',
                    'Id_Pago': '',
                    'Cancelado': '',
                    'Fecha': '',
                    'Id_Cliente_Serv': ClientePivote[i].id_Cliente_Servicio,
                    'Id_Servicio': ''

                };
                this.cliente = this.cliente.concat(newCliente);
            }

            for (let i = 0; i < ServicioPivote.length; i++) {
                this.cliente.forEach(client => {
                    if (client.Id_Cliente_Serv === ServicioPivote[i].id_Servicio) {
                    client.Servicio = ServicioPivote[i].tipo,
                    client.Id_Servicio = ServicioPivote[i].id_Servicio;
                    }
                });
            }

            for (let i = 0; i < PagosPivote.length; i++) {
                this.cliente.forEach(client => {
                    if (client.Id_Servicio === PagosPivote[i].id_Servicio_Pago) {
                    client.Cancelado = PagosPivote[i].monto,
                    client.Id_Pago = PagosPivote[i].id_Pago
                    client.Fecha = PagosPivote[i].fecha;
                    }
                });
            }
          // Success
          this.dataSource = this.cliente;
            console.log('datasoruce', this.dataSource);
            
        },
        error => {

        }
      );
}


Clientes() {
  this.MetodoServices.getClients().subscribe(
    data => {
        this.cliente = [];
        const datosCliente = Object.values(data);

        const ClientePivote = datosCliente[0];


        for (let i = 0; i < ClientePivote.length; i++) {
            const newCliente = {
                'Id': ClientePivote[i].id_Cliente_Client,
                'Nombre':  ClientePivote[i].nombre1,
                'Precio': ClientePivote[i].precio,
                'Id_Servicio': ClientePivote[i].id_Cliente_Servicio

                             };
            this.cliente = this.cliente.concat(newCliente);
        }
        this.valuePicker = this.cliente;
console.log(this.valuePicker);

    },
    error => {

    }
  );
}


}
