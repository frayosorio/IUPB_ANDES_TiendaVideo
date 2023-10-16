import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Empresa } from 'src/app/entidades/empresa';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { EmpresaEditarComponent } from '../empresa-editar/empresa-editar.component';
import { Pais } from 'src/app/entidades/pais';
import { PaisService } from 'src/app/servicios/pais.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DecidirComponent } from '../decidir/decidir.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {

  public textoBusqueda: string = "";
  public empresas: Empresa[] = [];
  public paises: Pais[] = [];
  public columnas = [
    { name: "Nombre Empresa", prop: "nombre" },
    { name: "Código", prop: "id" },
    { name: "País", prop: "pais.nombre" },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public empresaSeleccionada: Empresa | undefined;

  constructor(private empresaService: EmpresaService,
    private paisService: PaisService,
    public servicioDialogo: MatDialog,) {
  }

  ngOnInit(): void {
    this.listar();
    this.listarPaises();
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

  private listarPaises() {
    this.paisService.listar().subscribe(
      respuesta => {
        this.paises = respuesta;
      },
      error => {
        window.alert(error.message)
      }
    );
  }

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.empresaService.buscar(this.textoBusqueda).subscribe(
        respuesta => {
          this.empresas = respuesta;
        },
        (error: HttpErrorResponse) => {
          window.alert(`Error buscando Empresas: [${error.message}]`);
        });
    }
    else {
      this.listar();
    }

  }

  public agregar() {
    const cuadroDialogo = this.servicioDialogo.open(EmpresaEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Empresa:",
        empresa: new Empresa(
          0, //Id
          "", //Nombre
          new Pais(0, "", "", ""),
        ),
        paises: this.paises,
      }
    });

    cuadroDialogo.afterClosed().subscribe(
      datos => {
        if (datos) {
          this.empresaService.agregar(datos.empresa).subscribe(respuesta => {
            this.listar();
            window.alert("Los datos de la Empresa fueron agregados");
          },
            (error: HttpErrorResponse) => {
              window.alert(`Error agregando la Empresa: [${error.message}]`);
            });
        }
      }
    );
  }

  public modificar() {
    if (this.empresaSeleccionada != null && this.empresaSeleccionada.id >= 0) {
      const cuadroDialogo = this.servicioDialogo.open(EmpresaEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando datos de la Empresa [${this.empresaSeleccionada.nombre}]`,
          empresa: this.empresaSeleccionada,
          paises: this.paises,
        }
      });

      cuadroDialogo.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.empresaService.actualizar(datos.empresa).subscribe(respuesta => {
              this.listar();
              window.alert("Los datos de la Empresa fueron actualizados");
            },
              (error: HttpErrorResponse) => {
                window.alert(`Error actualizando la Empresa: [${error.message}]`);
              });
          }
        }
      );
    }
    else {
      window.alert("No hay empresa seleccionada para modificar");
    }
  }

  public verificarEliminar() {
    if (this.empresaSeleccionada != null && this.empresaSeleccionada.id >= 0) {
      const cuadroDialogo = this.servicioDialogo.open(DecidirComponent, {
        width: '500px',
        height: '200px',
        data: {
          titulo: `Eliminando registro de la empresa [${this.empresaSeleccionada.nombre}]`,
          mensaje: "Oíste guevón, estás seguro de eliminar esta información?",
          id: this.empresaSeleccionada.id,
        }
      });

      cuadroDialogo.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.empresaService.eliminar(datos.id).subscribe(respuesta => {
              if (respuesta == true) {
                this.listar();
                window.alert("El registro de la Empresa fue eliminado");
              }
              else {
                window.alert("No se pudo eliminar el registro de la Empresa");
              }
            },
              (error: HttpErrorResponse) => {
                window.alert(`Error actualizando la Empresa: [${error.message}]`);
              });
          }
        }
      );
    }
    else {
      window.alert("No hay empresa seleccionada para eliminar");
    }
  }


  public onActivate(event: any) {
    if (event.type == 'click') {
      this.empresaSeleccionada = event.row;
    }
  }


}
