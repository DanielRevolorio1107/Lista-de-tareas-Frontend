import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  // 1. Traemos la herramienta para hacer peticiones web
  private http = inject(HttpClient)
  // 2. Guardamos la dirección de tu API de FastAPI en una variable
  private apiUrl = 'http://localhost:8000/tareas/';
  constructor() { }

  //metodos
  //obtener
  obtenerTareas() {
    return this.http.get(this.apiUrl);
  }

  //crear tarea
  crearTarea(tarea: any){
    return this.http.post(this.apiUrl, tarea);
  }

  //eliminar tarea
  eliminarTarea(id:number){
    return this.http.delete(this.apiUrl + id)
  }

//actualizar tarea
actualizarTarea(id:number, tarea:any){
// Usamos put para actualizar datos existentes
  return this.http.put(`http://localhost:8000/tareas/${id}`, tarea);

}
}
