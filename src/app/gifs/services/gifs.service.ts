import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public resultados: Gif[] = [];

  //creamos el apiKey del gifphy
  private apiKey : string = "qWBRIzYBYBVmDYgkvvUFgP4EkjkSXaQN";
  private servicioURL: string = "https://api.giphy.com/v1/gifs";


  private _historial: string[] = [];

  get historial(){
    /*
    esta fue mi solucion para la tarea del video 85.controlar el historial pero
    no es el lugar indicado y además es mas sencillo manejarlo con un slice

    if(this._historial.length<=10)
    return [...this._historial];
    else{
      this._historial.pop();
      return[...this._historial];
    }*/

    return [...this._historial];
    
  }

  //inyectamos el servicio que nos ofrece el httpclient module
  constructor(private http: HttpClient){

    /*
    if(localStorage.getItem("historial")){
      this._historial= JSON.parse(localStorage.getItem("historial")!);
    } oooo se puede hacer esto en una sola linea*/
    this._historial= JSON.parse(localStorage.getItem("historial")!) || [];

    //mostramos la informacion del local storage de la tarea del video 91. cargar imagenes automaticamente
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];

  }

  buscarGifs(query: string=""){
    //aque pasamos todo a minuscular para no tener repeticiones, sin distincion si se escribe en minusculas
    //o mayusculas
    query=query.trim().toLocaleLowerCase();

    //aqui hacemos la validacion de que no haya repetidos
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      //aqui va la sulucion de la tarea del video 85
      this._historial=this._historial.splice(0,10);


      //para guardar en el local storage hacemos lo siguiente
      localStorage.setItem("historial",JSON.stringify(this._historial));
    }
    
    /*
    este fetch api esta bien, incluso lo podriamos simplificar con el asyn await, pero
    angular nos proporciona un objeto que ya es el encargado de hacer peticiones http 

    fetch("https://api.giphy.com/v1/gifs/search?api_key=qWBRIzYBYBVmDYgkvvUFgP4EkjkSXaQN&q=one punch man&limit=10")
      .then(respuesta =>{
        respuesta.json().then( data => {
          console.log(data);
        })
      })
    */


    //utilizando http params para construir los parametros
    //utilizados en la peticion a la api
    const params = new HttpParams()
      .set("api_key",this.apiKey)
      .set("limit","12")
      .set("q",query);

    console.log(params.toString());

    
    //utilizamos el servicio que nos ofrece httpClientModule
    //para hacer la peticion de los gifs a la api
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
      .subscribe((respuesta: SearchGifsResponse) => {
        //console.log(respuesta.data);
        this.resultados= respuesta.data;

        //Parte de la tarea de el video 91. cargar imagenes automaticamente
        localStorage.setItem("resultados",JSON.stringify(this.resultados));
      })




    //console.log(this._historial);
  
  }
}
