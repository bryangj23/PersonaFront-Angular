import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EstadosService {
  private API_HTTPSERVER = 'http://localhost:8080/estado/';
  constructor(private httpClient: HttpClient) {}

  public getAllEstadosByPais(idPais: any): Observable<any> {
    console.log(idPais);
    return this.httpClient.get(this.API_HTTPSERVER + idPais);
  }
}
