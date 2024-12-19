import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '', // Ruta principal para el portafolio
    loadComponent: () =>
      import('./portafolio/portafolio.component'),
  },
  {
    path: 'educacion', // Ruta para educación
    loadComponent: () =>
      import('./portafolio/Educacion/educacion/educacion.component').then(
        (m) => m.EducacionComponent
      ),
  },
  {
    path: '**', // Ruta para manejar páginas no encontradas
    redirectTo: '', // Redirige al portafolio principal
  },
];
