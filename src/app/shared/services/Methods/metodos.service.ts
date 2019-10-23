import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MetodosService {

  constructor(protected http: HttpClient) { }


  getClients() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadClient');
  }


  getMonth() {
    return this.http.get('https://backend-techmaster.azurewebsites.net/api/User/ReadMonth');
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


}
