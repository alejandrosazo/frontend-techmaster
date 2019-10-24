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



  displayedColumns = ['position', 'name', 'weight', 'symbol', 'IP'];
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


  prueba() {
    const Value = {
    'Cliente': {
      'Nombre1': 'Rodrigo',
      'Nombre2': 'Fernando',
      'Apellido1': 'Velasquez',
      'Apellido2': 'Sosa',
      'Direccion': 'Jutiapa',
      'Correo': 'ocrreis',
      'Descripcion_Client': 'Nuevo',
    },
    'Dispositivo':
    {
      'Id_TipoDispositivo_Disp': 1,
      'Descripcion_Disp': 'Nuevo',
      'IP': '32423423'
    }
    };
    const Dispositivo = {
      'Id_TipoDispositivo_Disp': 1,
      'Descripcion_Disp': 'Nuevo',
      'IP': '32423423'
    };
    const Telefono = {
      'Numero': '545646',
      'Extension': '252'
    };

    const Servicio = {
      'Descripcion_Servicio': 'Nuevoos',
      'Velocidad': '45',
      'Tipo': 'Cable'
    };
    this.MetodoServices.InsertCliente(Value).subscribe(data => {
      console.log(data);

    });
  }

  RegistrarPago() {

    const monto = this.loginForm.get('monto').value;
    const ArrayPago = {
      'Id_Mes_Pago': this.valueMes,
      'Monto': monto,
      'Fecha': new Date().toISOString(),
      'Id_Cliente_Pago': this.valueClient
    };
    if (monto === '') {
      Swal.fire('Favor Llenar los campos');
    } else {
    this.MetodoServices.InsertPago(ArrayPago).subscribe(data => {
      console.log(data);

    });
    Swal.fire('Pago Registrado');

  }
  }

  changeMes(value) {
    this.valueMes = value;
}


changeCliente(value) {
  this.valueClient = value;
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
                    'Cancelado': '',
                    'Fecha': '',
                    'Id_Cliente_Serv': '',
                    'Id_Servicio': ''

                };
                this.cliente = this.cliente.concat(newCliente);
            }

            for (let i = 0; i < ServicioPivote.length; i++) {
                this.cliente.forEach(client => {
                    if (client.Id === ServicioPivote[i].id_Cliente_Servicio) {
                    client.Id_Cliente_Serv = ServicioPivote[i].id_Cliente_Servicio,
                    client.Servicio = ServicioPivote[i].descripcion_Servicio,
                    client.Id_Servicio = ServicioPivote[i].id_Servicio;
                    }
                });
            }

            for (let i = 0; i < PagosPivote.length; i++) {
                this.cliente.forEach(client => {
                    if (client.Id_Servicio === PagosPivote[i].id_Servicio_Pago) {
                    client.Cancelado = PagosPivote[i].monto,
                    client.Fecha = PagosPivote[i].fecha;
                    }
                });
            }
          // Success
          this.dataSource = this.cliente;

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
                'Nombre':  ClientePivote[i].nombre1

                             };
            this.cliente = this.cliente.concat(newCliente);
        }
        this.valuePicker = this.cliente;

    },
    error => {

    }
  );
}


}
