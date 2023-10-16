import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TiendaVideo';

  public opciones = [
    { titulo: "Paises", ruta: "pais", icono: "assets/iconos/Pais.png" },
    { titulo: "Empresas", ruta: "empresa", icono: "assets/iconos/Empresa.png" },
    { titulo: "Títulos", ruta: "titulo", icono: "assets/iconos/Titulo.png" },
  ]

}
