import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Empresa } from 'src/app/entidades/empresa';
import { Titulo } from 'src/app/entidades/titulo';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { TituloService } from 'src/app/servicios/titulo.service';
import { TituloEditarComponent } from '../titulo-editar/titulo-editar.component';
import { Pais } from 'src/app/entidades/pais';
import { HttpErrorResponse } from '@angular/common/http';
import { DecidirComponent } from '../decidir/decidir.component';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent {
  public textoBusqueda: string = "";
  public titulos: Titulo[] = [];
  public empresas: Empresa[] = [];
  public tituloSeleccionado: Titulo | undefined;

  public columnas = [
    { name: 'Nombre', prop: 'nombre' },
    { name: 'Año Pub.', prop: 'año' },
    { name: 'Protagonistas', prop: 'protagonistas' },
    { name: 'Productor', prop: 'productor' },
    { name: 'Director', prop: 'director' },
    { name: 'Empresa', prop: 'empresa.nombre' },
    { name: 'Precio', prop: 'precio' },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public constructor(private tituloService: TituloService,
    private empresaService: EmpresaService,
    public servicioDialogo: MatDialog,) {

  }

  ngOnInit(): void {
    this.listar();
    this.listarTitulos();
  }

  private listar() {
    this.tituloService.listar().subscribe(
      respuesta => {
        this.titulos = respuesta;
      },
      error => {
        window.alert(error.message)
      }
    );
  }

  private listarTitulos() {
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
    if (this.textoBusqueda.length > 0) {
      this.tituloService.buscar(this.textoBusqueda)
        .subscribe(data => {
          this.titulos = data;
        },
          error => {
            window.alert(error.message)
          });
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const cuadroDialogo = this.servicioDialogo.open(TituloEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Titulo:",
        titulo: new Titulo(0, "", 0, "", "", "", new Empresa(0, "", new Pais(0, "", "", "")), 0),
        empresas: this.empresas,
      }
    });

    cuadroDialogo.afterClosed().subscribe(
      datos => {
        datos.titulo.año = datos.titulo.ano;
        this.tituloService.agregar(datos.titulo).subscribe(respuesta => {
          this.listar();
          window.alert("Los datos de la Titulo fueron agregados");
        },
          (error: HttpErrorResponse) => {
            window.alert(`Error agregando la Titulo: [${error.message}]`);
          });
      }
    );
  }

  public modificar() {
    if (this.tituloSeleccionado != null && this.tituloSeleccionado.id >= 0) {
      this.tituloSeleccionado.ano = this.tituloSeleccionado.año;
      const cuadroDialogo = this.servicioDialogo.open(TituloEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando a datos del título [${this.tituloSeleccionado.nombre}]`,
          titulo: this.tituloSeleccionado,
          empresas: this.empresas,
        }
      });

      cuadroDialogo.afterClosed().subscribe(
        datos => {
          if (datos) {
            datos.titulo.año = datos.titulo.ano;
            this.tituloService.actualizar(datos.titulo).subscribe(respuesta => {
              this.listar();
              window.alert("Los datos del Título fueron actualizados");
            },
              (error: HttpErrorResponse) => {
                window.alert(`Error actualizando la Titulo: [${error.message}]`);
              });
          }
        }
      );
    }
    else {
      window.alert("No hay titulo seleccionado para modificar");
    }
  }

  public verificarEliminar() {
    if (this.tituloSeleccionado != null && this.tituloSeleccionado.id >= 0) {
      const dialogRef = this.servicioDialogo.open(DecidirComponent, {
        width: '400px',
        height: '200px',
        data: {
          titulo: `Eliminando registro del título [${this.tituloSeleccionado.nombre}]`,
          mensaje: "Está seguro?",
          id: this.tituloSeleccionado.id,
        }
      });

      dialogRef.afterClosed().subscribe(datos => {
        if (datos) {
          this.tituloService.eliminar(datos.id).subscribe(response => {
            if (response == true) {
              this.listar();
              window.alert("El registro del Título de Videojuego fue eliminado");
            }
            else {
              window.alert("No se pudo eliminar el registro del Título de Videojuego");
            }
          },
            error => {
              window.alert(error.message)
            }
          );
        }
      });
    }
    else {
      window.alert("Debe seleccionar un Título");
    }
  }

  public onActivate(event: any) {
    if (event.type == 'click') {
      this.tituloSeleccionado = event.row;
    }
  }

}
