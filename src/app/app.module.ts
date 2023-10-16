import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReferenciasMaterialModule } from './referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { EmpresaEditarComponent } from './componentes/empresa-editar/empresa-editar.component';
import { TituloComponent } from './componentes/titulo/titulo.component';
import { TituloEditarComponent } from './componentes/titulo-editar/titulo-editar.component';
import { DecidirComponent } from './componentes/decidir/decidir.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    EmpresaComponent,
    EmpresaEditarComponent,
    TituloComponent,
    TituloEditarComponent,
    DecidirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
