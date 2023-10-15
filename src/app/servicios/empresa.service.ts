import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../entidades/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.urlServidorAPI}empresas`;
  }

  public listar(): Observable<Empresa[]> {
    const urlT = `${this.url}/listar`;
    return this.http.get<Empresa[]>(urlT);
  }
}
