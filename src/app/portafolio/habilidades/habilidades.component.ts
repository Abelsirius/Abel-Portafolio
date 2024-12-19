import { Component } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.css'
})
export class HabilidadesComponent {
  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Seleccionamos todos los elementos con la clase .component
    const elements = document.querySelectorAll('.xd3');

    elements.forEach((element) => {
      // Aseguramos que el elemento es de tipo HTMLElement
      const el = element as HTMLElement;

      // Usamos GSAP para animar el elemento mientras se hace scroll
      gsap.fromTo(el,
        { scale: 0.8 },  // Comienza con un tamaño pequeño
        { 
          scale: 1,  // Se agranda a su tamaño normal
          ease: 'power3.out',  // Suavizado de la animación
          delay: 0.5,  // Espera medio segundo antes de comenzar la animación
          scrollTrigger: {
            trigger: el,  // El trigger es el propio elemento
            start: 'top 80%',  // Comienza cuando el 80% del elemento entra en el viewport
            end: 'top 20%',    // Termina cuando el 20% del elemento sale del viewport
            scrub: true,       // Sincroniza la animación con el scroll
            markers: false     // Desactivar los marcadores para pruebas
          }
        }
      );
    });
  }
}
