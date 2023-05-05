import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  

  constructor(private gifsService: GifsService){}

  get historial(){
    return this.gifsService.historial;
  }

  //llamando a nuestro servicio para que se muestren las imagenes de las
  //busquedas anteriores parte de la tarea de el video 92. obtener imagenes desde el sidebar
  buscar(elemento: string){
    this.gifsService.buscarGifs(elemento);
  }
}
