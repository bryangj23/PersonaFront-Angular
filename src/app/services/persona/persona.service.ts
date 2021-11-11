import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private API_HTTPSERVER = 'http://localhost:8080/personas/';
  constructor(private httpClient: HttpClient) {}

  public getAllPersonas(): Observable<any> {
    return this.httpClient.get(this.API_HTTPSERVER);
  }

  public savePersona(persona: any): Observable<any> {
    return this.httpClient.post(this.API_HTTPSERVER, persona);
  }
  public deletePersona(id: any): Observable<any> {
    return this.httpClient.delete(this.API_HTTPSERVER + 'delete/' + id);
  }
}
