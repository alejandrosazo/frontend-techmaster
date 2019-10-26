import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MetodosService } from '../../shared/services/Methods/metodos.service';
import Swal from 'sweetalert2';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.scss']
})
export class Screen3Component implements OnInit {

  constructor(private router: Router, protected MetodoServices: MetodosService, private fb: FormBuilder) { }
  displayedColumns = ['Distribuye', 'IP2', 'Cliente', 'Punto', 'IP3', 'Routher', 'IP4'];
  loginForm: FormGroup;
  selectCliente;
  valueCliente;
  cliente;
  selectDispositivo1;
  valueDisp;
  tipoDisp;
  selectDispositivo2;
  selectDispositivo3;
  selectDispositivo4;
  dispositivos;
  dataSource;
  tipoDispositivo;

  ngOnInit() {
    this.loginForm = this.fb.group({      
      IP1: new FormControl('', []),
      IP2: new FormControl('', []),
      IP3: new FormControl('', []),
      IP4: new FormControl('', []),
    });
    this.TipoDispostivio();
    this.Clientes();
    this.Dispositivos();
  }

  TipoDispostivio() {
    this.MetodoServices.getReadTipoDispositivo().subscribe(
      data => {
          this.tipoDisp = [];
          const datosCliente = Object.values(data);
  
          for (let i = 0; i < datosCliente.length; i++) {
              const newCliente = {
                  'Id': datosCliente[i].id_TipoDispositivo,
                  'Dispositivo':  datosCliente[i].descripcion_TipoDis,
                };
              this.tipoDisp = this.tipoDisp.concat(newCliente);
          }
          this.valueDisp = this.tipoDisp;   
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
                'Precio': ClientePivote[i].precio

                             };
            this.cliente = this.cliente.concat(newCliente);
        }
        this.valueCliente = this.cliente;


    },
    error => {

    }
  );
}

RegistrarDispositivos(){
  const ip1 = this.loginForm.get('IP1').value;
  const ip2= this.loginForm.get('IP2').value;
  const ip3 = this.loginForm.get('IP3').value;
  const ip4 = this.loginForm.get('IP4').value;

  
  const ArrayDispositivo = {
    "Id_Cliente_Disp": this.selectCliente,
    "Id_TipoDispositivo_Disp1": this.selectDispositivo1,
    "IP1": ip1,
    "Id_TipoDispositivo_Disp2": this.selectDispositivo2,
    "IP2": ip2,
    "Id_TipoDispositivo_Disp3": this.selectDispositivo3,
    "IP3": ip3,
    "Id_TipoDispositivo_Disp4": this.selectDispositivo4,
    "IP4": ip4
  }

  if (ip1 === '') {
    Swal.fire('Favor Llenar los campos');
  } else {
  this.MetodoServices.InsertDispositivo(ArrayDispositivo).subscribe(data => {
    console.log(data);

  });
  Swal.fire('Dispositivo Registrado Exitosamente').then(()=>{
    window.location.reload();
  }); 

}
}




Dispositivos() {
  this.MetodoServices.getDispositivos().subscribe(
      data => {
        this.MetodoServices.getReadTipoDispositivo().subscribe(
          data2 => {
          this.tipoDispositivo  = [] 
          const datosTipoDisp = Object.values(data2);
          
          
          this.dispositivos = [];
          const datosCliente = Object.values(data);

          const Cliente = datosCliente[0];
          const Dispositivo = datosCliente[1];
          const TipoDisp = datosCliente[2];

          for (let i = 0; i < Cliente.length; i++) {
              const newCliente = {
                  'Id': Cliente[i].id_Cliente_Client,
                  'Nombre':  Cliente[i].nombre1,
                  'Id_Dispositivo': '',
                  'Id_Cliente_Disp': '',
                  'Id_TipoDisp1': '',
                  'Descripcion1': '',
                  'IP1': '',
                  'Id_TipoDisp2': '',
                  'Descripcion2': '',
                  'IP2': '',
                  'Id_TipoDisp3': '',
                  'Descripcion3': '',
                  'IP3': '',
                  'Id_TipoDisp4': '',
                  'Descripcion4': '',
                  'IP4': ''                  
                  

              };
              this.dispositivos = this.dispositivos.concat(newCliente);
          }

          for (let i = 0; i < Dispositivo.length; i++) {
              this.dispositivos.forEach(client => {
                  if (client.Id === Dispositivo[i].id_Cliente_Disp) {
                  client.Id_Dispositivo = Dispositivo[i].id_Dispositivo,
                  client.Id_Cliente_Disp = Dispositivo[i].id_Cliente_Disp,
                  client.Id_TipoDisp1 = Dispositivo[i].id_TipoDispositivo_Disp1,
                  client.IP1 = Dispositivo[i].iP1,
                  client.Id_TipoDisp2 = Dispositivo[i].id_TipoDispositivo_Disp2,
                  client.IP2 = Dispositivo[i].iP2,
                  client.Id_TipoDisp3 = Dispositivo[i].id_TipoDispositivo_Disp3,
                  client.IP3 = Dispositivo[i].iP3,
                  client.Id_TipoDisp4 = Dispositivo[i].id_TipoDispositivo_Disp4,
                  client.IP4 = Dispositivo[i].iP4
                  }
              });
          }

          for (let i = 0; i < datosTipoDisp.length; i++) {
              this.dispositivos.forEach(client => {
                  if (client.Id_TipoDisp1 === datosTipoDisp[i].id_TipoDispositivo) {
                  client.Descripcion1 = datosTipoDisp[i].descripcion_TipoDis
                  }

                  if (client.Id_TipoDisp2 === datosTipoDisp[i].id_TipoDispositivo) {
                    client.Descripcion2 = datosTipoDisp[i].descripcion_TipoDis
                  }
                  if (client.Id_TipoDisp3 === datosTipoDisp[i].id_TipoDispositivo) {
                    client.Descripcion3 = datosTipoDisp[i].descripcion_TipoDis
                  }
                  if (client.Id_TipoDisp4 === datosTipoDisp[i].id_TipoDispositivo) {
                    client.Descripcion4 = datosTipoDisp[i].descripcion_TipoDis
                    }
              });
          }
        // Success
        console.log('tipodisp', datosTipoDisp);
        
        this.dataSource = this.dispositivos;
          console.log('datasource', this.dataSource);
          
      },
      error => {

      }
    );
  }
  );
}


  changeCliente(value){
    this.selectCliente = value;
  }
  changeDisp1(value){
    this.selectDispositivo1 = value;
  }
  changeDisp2(value){
    this.selectDispositivo2 = value;
  }
  changeDisp3(value){
    this.selectDispositivo3 = value;
  }
  changeDisp4(value){
    this.selectDispositivo4 = value;
  }
}
