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
  IdClient;
  isDisable;
  IdTel;

  UpdOrIns = 'Ingresar';

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
      velocidad: new FormControl('', []),
      ip: new FormControl('', []),
      descrip_serv: new FormControl('', []),
      
      tipo: new FormControl('', []),
      precio: new FormControl('', []),
      descrip_client:  new FormControl('', [])
    });

    this.TipoDispostivio();
    console.log(localStorage.getItem('IdClient'));
    
    this.IdClient = localStorage.getItem('IdClient');

    if(this.IdClient == null){
      this.UpdOrIns = 'Ingresar';
      this.isDisable = true;

    }else{
      this.UpdOrIns = 'Actualizar';
      this.isDisable = false;
      this.ObtenerClient(this.IdClient);
    }
    
  }

  cancel(){
    this.loginForm.patchValue(
      { 
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        direccion: '',
        correo: '',
        descrip_client: ''
      });
      this.isDisable = true;
      this.IdClient = null;
      localStorage.removeItem('IdClient');
      this.UpdOrIns = 'Ingresar';
  }

  ObtenerClient(Id){
    this.MetodoServices.getClientsUpdate(Id).subscribe(data => {
      const datosCliente = Object.values(data);
      
            const Cliente = datosCliente[0];
            const ServicioPivote = datosCliente[1];
            const Telefono = datosCliente[2];
      
      for (let i = 0; i < Cliente.length; i++) {
        this.loginForm.patchValue(
          { 
            nombre1: Cliente[i].nombre1,
            nombre2: Cliente[i].nombre2,
            apellido1: Cliente[i].apellido1,
            apellido2: Cliente[i].apellido2,
            direccion: Cliente[i].direccion,
            correo: Cliente[i].correo,
            descrip_client: Cliente[i].descripcion_Client
          });

      }
      for (let i = 0; i < ServicioPivote.length; i++) {
        this.loginForm.patchValue(
          { 
            velocidad: ServicioPivote[i].velocidad,
            precio: ServicioPivote[i].precio,
            
          });
      }
      for (let i = 0; i < Telefono.length; i++) {
        this.IdTel = Telefono[i].id_Telefono;
        this.loginForm.patchValue(
          { 
            
            numero: Telefono[i].numero,
            extension: Telefono[i].extension,
            
          });
      }



    })
  }

  TipoDispostivio() {
  this.MetodoServices.getServicios().subscribe(
    data => {
        this.tipoDisp = [];
        const datosCliente = Object.values(data);

        for (let i = 0; i < datosCliente.length; i++) {
            const newCliente = {
                'Id': datosCliente[i].id_Servicio,
                'Servicio':  datosCliente[i].tipo,
                'Velocidad': datosCliente[i].velocidad,
                'Precio': datosCliente[i].precio

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
  
  for(var i=0; i < this.valueTipoDisp.length; i++ ){
    if(this.valueTipoDisp[i].Id == value){
      
      this.loginForm.patchValue(
        { 
          velocidad: this.valueTipoDisp[i].Velocidad
        });
        this.loginForm.patchValue(
          { 
            precio:'Q. ' + this.valueTipoDisp[i].Precio
          });
      
    }
  }
  
}

RegistrarCliente() {
if(this.IdClient == null){
  //INICIA INSERTAR
  const nombre1 = this.loginForm.get('nombre1').value;
  const nombre2= this.loginForm.get('nombre2').value;
  const apellido1 = this.loginForm.get('apellido1').value;
  const apellido2 = this.loginForm.get('apellido2').value;
  const extension = this.loginForm.get('extension').value;
  const numero = this.loginForm.get('numero').value;
  const correo = this.loginForm.get('correo').value;
  const direccion = this.loginForm.get('direccion').value;
  
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
    "Id_Servicio": this.selectedValueTipoDisp,
  };
  console.log(ArrayPago);
  
  
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
//FIN INSERTAR
}

else{

  //INICIA ACTUALIZAR
  const nombre1 = this.loginForm.get('nombre1').value;
  const nombre2= this.loginForm.get('nombre2').value;
  const apellido1 = this.loginForm.get('apellido1').value;
  const apellido2 = this.loginForm.get('apellido2').value;
  const extension = this.loginForm.get('extension').value;
  const numero = this.loginForm.get('numero').value;
  const correo = this.loginForm.get('correo').value;
  const direccion = this.loginForm.get('direccion').value;
  const idTel = this.IdTel;
  const idClient = this.IdClient;
  const descrip_client = this.loginForm.get('descrip_client').value;

  const ArrayPago = {
    "Id_Cliente": idClient,
    "Id_Telefono": idTel,
    "Nombre1": nombre1,
    "Nombre2": nombre2,
    "Apellido1": apellido1,
    "Apellido2": apellido2,
    "Direccion": direccion,
    "Correo": correo,
    "Descripcion_Client": descrip_client,
    "Numero": numero,
    "Extension": extension,
    "Id_Servicio": this.selectedValueTipoDisp,
  };
  console.log(ArrayPago);
  
  
  if (nombre1 === '') {
    Swal.fire('Favor Llenar los campos');
  } else {
  this.MetodoServices.UpdateClient(ArrayPago).subscribe(data => {
    console.log(data);

  });
  Swal.fire('Cliente Registrado Exitosamente').then(()=>{
    this.cancel();
    window.location.reload();

  }); 


}
//FIN ACTUALIZA


}

}

}
