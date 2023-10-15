import { Component } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
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
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  constructor(private empresaService: EmpresaService,) {
  }

  ngOnInit(): void {
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


  public onActivate(event: any) {

  }


}
