import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../entidades/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.urlServidorAPI}paises`;
  }

  public listar(): Observable<Pais[]> {
    const urlT = `${this.url}/listar`;
    return this.http.get<Pais[]>(urlT);
  }
}
