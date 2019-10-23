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
}


const ELEMENT_DATA: ElementosCliente[] = [];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns = ['position', 'name', 'weight', 'symbol', 'IP'];
    dataSource;
    TotalClientes;
    TotalServicios;
    TotalPagos;
    cliente = [];

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        //this.dataSource.filter = filterValue;
    }

    constructor(protected MetodoServices : MetodosService) {
      
    }

    
    ngOnInit() {
        this.TotalDatos();
        this.Clientes();

        
        
        
    }


    Clientes(){
        this.MetodoServices.getClients().subscribe(
            data => {
                this.cliente = [];
                var datosCliente = Object.values(data);

                var ClientePivote = datosCliente[0];
                var DispositivoPivote = datosCliente[1];
                var TipoDispPivote = datosCliente[2];
                
                for(var i = 0; i < ClientePivote.length; i++){
                    let newCliente = {
                        'Id': ClientePivote[i].id_Cliente_Client,
                        'Nombre':  ClientePivote[i].nombre1,
                        'Direccion': ClientePivote[i].direccion,
                        'ip': '',
                        'descripcion_TipoDisp': '',
                        'Id_TipoDispositivo': ''                    }
                    this.cliente = this.cliente.concat(newCliente);
                }

                for(var i = 0; i < DispositivoPivote.length; i++){
                    this.cliente.forEach(client => {
                        if(client.Id === DispositivoPivote[i].id_Cliente_Disp)
                        client.ip = DispositivoPivote[i].ip,
                        client.Id_TipoDispositivo = DispositivoPivote[i].id_TipoDispositivo_Disp
                    })
                }

                for(var i = 0; i < TipoDispPivote.length; i++){
                    this.cliente.forEach(client => {
                        if(client.Id_TipoDispositivo === TipoDispPivote[i].id_TipoDispositivo)
                        client.descripcion_TipoDisp = TipoDispPivote[i].descripcion_TipoDis
                    })
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

    TotalDatos(){
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
              console.log('dato ',data);
              
              this.TotalServicios = data;
            },
            error => {
             
            }
          );

          this.MetodoServices.getReadTotalPago().subscribe(
            data => {
              // Success
              console.log('dato ',data);
              
              this.TotalPagos = data;
            },
            error => {
             
            }
          );
    }
}
