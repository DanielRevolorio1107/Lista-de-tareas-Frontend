import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  private tareasService = inject(TareasService);

// 1. Aquí guardaremos las tareas para mostrarlas en el HTML
tareas : any [] = [];
// Esta función especial de Angular se ejecuta automáticamente al abrir la página
ngOnInit(){
  this.cargarTareas();
}

cargarTareas(){
  // Llamamos al mensajero y nos "suscribimos" para esperar la respuesta
  this.tareasService.obtenerTareas().subscribe((datos: any) => {
    // El paquete ya llegó y su contenido está en la variable 'datos'.
    //guardar esos 'datos'
    this.tareas = datos 
  });
}

borrarTareas(id :number){

this.tareasService.eliminarTarea(id).subscribe(() => {
// La base de datos (FastAPI) ya confirmó que borró la tarea.
      // actualizar tareas
      this.cargarTareas();
});
}

agregarTarea(tituloNuevo: string, descripcion: string){
  // Verificamos que al menos el título tenga texto
  if (!tituloNuevo.trim()) return;
  // 1. Armamos el paquete con los datos que espera FastAPI
  const nuevaTarea = {
    titulo : tituloNuevo,
    descripcion : descripcion,
    completada : false
  };

  // 2. Usamos nuestro servicio para enviar la tarea y nos suscribimos
  this.tareasService.crearTarea(nuevaTarea).subscribe(() => {
    // 3. Volvemos a pedir la lista para ver la nueva tarea
    this.cargarTareas();

  });
}

alternarTarea(tarea:any){
// Le damos la vuelta al estado actual
tarea.completada = !tarea.completada;
// Llamamos al servicio para actualizarla en la base de datos
this.tareasService.actualizarTarea(tarea.id, tarea).subscribe(() =>{
// Refrescamos para asegurar que todo esté sincronizado
this.cargarTareas();
});
}
}