import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Titulo } from '../entidades/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.urlServidorAPI}titulos`;
  }

  public listar(): Observable<Titulo[]> {
    const urlT = `${this.url}/listar`;
    return this.http.get<Titulo[]>(urlT);
  }

  public buscar(nombre: string): Observable<Titulo[]> {
    const urlT = `${this.url}/buscar/${nombre}`;
    return this.http.get<Titulo[]>(urlT);
  }

  public agregar(titulo: Titulo): Observable<Titulo> {
    let urlT = `${this.url}/agregar`;
    return this.http.post<Titulo>(urlT, titulo);
  }

  public actualizar(titulo: Titulo): Observable<Titulo> {
    let urlT = `${this.url}/modificar`;
    return this.http.put<Titulo>(urlT, titulo);
  }

  public eliminar(id: number): Observable<boolean> {
    let urlT = `${this.url}/eliminar/${id}`;
    return this.http.delete<boolean>(urlT);
  }


}
