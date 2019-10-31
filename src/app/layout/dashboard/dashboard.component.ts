import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MetodosService } from '../../shared/services/Methods/metodos.service';
import Swal from 'sweetalert2';

export interface ElementosCliente {
    Id: string;
    Nombre: string;
    Direccion: string;
    ip: string;
    descripcion_TipoDisp: string;
    Id_TipoDispositivo: string;
    Eliminar: string;
}


const ELEMENT_DATA: ElementosCliente[] = [];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns = ['position', 'name', 'weight', 'symbol', 'IP', 'Eliminar', 'Editar'];
    dataSource;
    TotalClientes;
    TotalServicios;
    TotalPagos;
    cliente = [];

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        // this.dataSource.filter = filterValue;
    }

    constructor(protected MetodoServices: MetodosService, private router:Router) {

    }


    ngOnInit() {
        this.TotalDatos();
        this.Clientes();
    }


    Editar(Id){
      localStorage.setItem('IdClient',Id)
      this.router.navigate(['/screen2']);
    }


    Eliminar(Id){
      Swal.fire({
        title: 'Seguro Quiere Eliminar el Cliente',
        text: "Desea Eliminar El Registro?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.value) {
          this.MetodoServices.DeleteCliente(Id).subscribe(page => {

          });
          
          Swal.fire(
            'Eliminado!',
            'El Cliente a sido Eliminado',
            'success'
          ).then(() => 
          {
            window.location.reload();
          }
          );
        }
      })
      
    }


    Clientes() {
        this.MetodoServices.getClients().subscribe(
            data => {
                this.cliente = [];
                const datosCliente = Object.values(data);

                const ClientePivote = datosCliente[0];
                const ServicioPivote = datosCliente[1];
                

                for (let i = 0; i < ClientePivote.length; i++) {
                    const newCliente = {
                        'Id': ClientePivote[i].id_Cliente_Client,
                        'Id_Servicio_Cliente': ClientePivote[i].id_Cliente_Servicio,
                        'Nombre':  ClientePivote[i].nombre1,
                        'Direccion': ClientePivote[i].direccion,
                        'Tipo': '',
                        'Velocidad': '' ,
                        'Id_Servicio': ''
                      };
                    this.cliente = this.cliente.concat(newCliente);
                }

                for (let i = 0; i < ServicioPivote.length; i++) {
                    this.cliente.forEach(client => {
                        if (client.Id_Servicio_Cliente === ServicioPivote[i].id_Servicio) {
                        client.Tipo = ServicioPivote[i].tipo,
                        client.Velocidad = ServicioPivote[i].velocidad;
                        }
                    });
                }

              // Success
              console.log('cliente ', data);


              this.dataSource = this.cliente;
              console.log('dato ', this.dataSource);
            },
            error => {

            }
          );
    }


    TotalDatos() {
        this.MetodoServices.getReadTotalCliente().subscribe(
            data => {
              // Success

              this.TotalClientes = data;
            },
            error => {

            }
          );

          this.MetodoServices.getReadReadTotalServicio().subscribe(
            data => {
              // Success


              this.TotalServicios = data;
            },
            error => {

            }
          );

          this.MetodoServices.getReadTotalPago().subscribe(
            data => {
              // Success


              this.TotalPagos = data;
            },
            error => {

            }
          );
    }
}
