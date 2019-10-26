import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MetodosService {

  constructor(protected http: HttpClient) { }


  InsertPago(value) {
    return this.http.post('https://backend-techmaster.azurewebsites.net/api/User/RegisterPago', value, { responseType: 'json' });
  }

  InsertCliente(value ) {
    return this.http.post('https://backend-techmaster.azurewebsites.net/api/User/RegisterCliente', value, { responseType: 'json' });
  }

  InsertDispositivo(value ) {
    return this.http.post('https://backend-techmaster.azurewebsites.net/api/User/RegisterDispositivo', value, { responseType: 'json' });
  }



  

  getClients() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadClient');
  }


  getPagos() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadPagos');
  }


  getMonth() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadMonth');
  }

  
  getServicios() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadServicios');
  }


  getReadTipoDispositivo() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadTipoDispositivo');
  }

  getReadTotalCliente() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadTotalCliente');
  }

  getReadTotalPago() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadTotalPago');
  }


  getReadReadTotalServicio() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadTotalServicio');
  }


  DeleteCliente(id) {
    return this.http.delete('https://backend-techmaster.azurewebsites.net/api/User/' + id);
  }



}
