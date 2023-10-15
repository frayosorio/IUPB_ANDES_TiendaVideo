import { Component } from '@angular/core';
import { Empresa } from 'src/app/entidades/empresa';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {

  public textoBusqueda: string = "";
  public empresas: Empresa[] = [];
  public columnas = [
    { name: "Nombre Empresa", prop: "nombre" },
    { name: "Código", prop: "id" },
    { name: "País", prop: "pais.pais" },
  ];


  constructor(private empresaService: EmpresaService,) {
  }

  gOnInit(): void {
    this.listar();
  }

  private listar() {
    this.empresaService.listar().subscribe(
      respuesta => {
        this.empresas = respuesta;
      },
      error => {
        window.alert(error.message)
      }
    );
  }

  public buscar() {

  }

  public agregar() {

  }

  public modificar() {

  }

  public verificarEliminar() {

  }

}
