import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MetodosService } from '../../shared/services/Methods/metodos.service';
import Swal from 'sweetalert2';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component implements OnInit {

  constructor(private router: Router, protected MetodoServices: MetodosService, private fb: FormBuilder) { }
  loginForm: FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  selectedValueTipoDisp;
  valueTipoDisp;
  tipoDisp;

  ngOnInit() {
    this.loginForm = this.fb.group({      
      
      nombre1: new FormControl('', []),
      nombre2: new FormControl('', []),
      apellido1: new FormControl('', []),
      apellido2: new FormControl('', []),
      extension: new FormControl('', []),
      numero: new FormControl('', []),
      correo: new FormControl('', []),
      direccion: new FormControl('', []),
      descrip_disp: new FormControl('', []),
      ip: new FormControl('', []),
      descrip_serv: new FormControl('', []),
      velocidad: new FormControl('', []),
      tipo: new FormControl('', []),
      descrip_client:  new FormControl('', [])
    });


    this.TipoDispostivio();
  }

  TipoDispostivio() {
  this.MetodoServices.getReadTipoDispositivo().subscribe(
    data => {
        this.tipoDisp = [];
        const datosCliente = Object.values(data);

        for (let i = 0; i < datosCliente.length; i++) {
            const newCliente = {
                'Id': datosCliente[i].id_TipoDispositivo,
                'TipoDisp':  datosCliente[i].descripcion_TipoDis

                             };
            this.tipoDisp = this.tipoDisp.concat(newCliente);
        }
        this.valueTipoDisp = this.tipoDisp;
      
        
    },
    error => {

    }
  );
}


changeCliente(value) {
  this.selectedValueTipoDisp = value;
}

RegistrarCliente() {

  const nombre1 = this.loginForm.get('nombre1').value;
  const nombre2= this.loginForm.get('nombre2').value;
  const apellido1 = this.loginForm.get('apellido1').value;
  const apellido2 = this.loginForm.get('apellido2').value;
  const extension = this.loginForm.get('extension').value;
  const numero = this.loginForm.get('numero').value;
  const correo = this.loginForm.get('correo').value;
  const direccion = this.loginForm.get('direccion').value;
  const descrip_disp = this.loginForm.get('descrip_disp').value;
  const ip = this.loginForm.get('ip').value;
  const descrip_serv = this.loginForm.get('descrip_serv').value;
  const velocidad = this.loginForm.get('velocidad').value;
  const tipo = this.loginForm.get('tipo').value;
  const descrip_client = this.loginForm.get('descrip_client').value;



  const ArrayPago = {
    "Nombre1": nombre1,
    "Nombre2": nombre2,
    "Apellido1": apellido1,
    "Apellido2": apellido2,
    "Direccion": direccion,
    "Correo": correo,
    "Descripcion_Client": descrip_client,
    "Numero": numero,
    "Extension": extension,
    "Id_TipoDispositivo_Disp": this.selectedValueTipoDisp,
    "Descripcion_Disp": descrip_disp,
    "IP": ip,
    "Descripcion_Servicio": descrip_serv,
    "Velocidad": velocidad,
    "Tipo": tipo
    
  };
  
  
  if (nombre1 === '') {
    Swal.fire('Favor Llenar los campos');
  } else {
  this.MetodoServices.InsertCliente(ArrayPago).subscribe(data => {
    console.log(data);

  });
  Swal.fire('Cliente Registrado Exitosamente').then(()=>{
    window.location.reload();

  }); 


}
}

}
