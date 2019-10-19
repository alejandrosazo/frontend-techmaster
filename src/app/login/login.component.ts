import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserServicesService } from '../shared/services/User/user-services.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, protected clienteService: UserServicesService, private fb: FormBuilder) {}

    loginForm: FormGroup;

    ngOnInit() {
        this.loginForm = this.fb.group({
            user: new FormControl('', []),
            clave: new FormControl('', [])
          });
    }
    users;

    onLogin() {
      var user = this.loginForm.get('user').value;
      var clave = this.loginForm.get('clave').value;
  
      if (user == '' && clave == '') {
        Swal.fire('Favor Llene los Campos');
      } else {
        this.clienteService.getUsers(user, clave).subscribe(
          data => {
            // Success
            
            this.users = data;
            console.log("Usuario", this.users)
            if (this.users.Usuario_UserName == user && this.users.Usuario_Password == clave) {
              Swal.fire('Login Correcto');
              localStorage.setItem('isLoggedin', 'true');
              this.router.navigate(['/dashboard']);
            } else {
              Swal.fire('Clave o Usuario Incorrecto');
            }
          },
  
          error => {
            console.error(error);
          }
        );
      }
    }
}
