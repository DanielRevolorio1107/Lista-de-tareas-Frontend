import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {


  // 2. Guardamos la dirección de tu API de FastAPI en una variable
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

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
