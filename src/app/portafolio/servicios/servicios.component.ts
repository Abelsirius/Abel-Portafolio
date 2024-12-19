import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GlobalStateService } from '../../shared/servicios/global-state.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit  {

  public isDark = signal(false);
  public plaform = inject(PLATFORM_ID);
  ngOnInit(): void {
    this.event.theme$.subscribe((theme)=>{
      this.isDark.update(()=> theme.darktheme)
   })
  }
  
  public event = inject(GlobalStateService);



  ngAfterViewInit() {
     if(isPlatformBrowser(this.plaform)){
      gsap.registerPlugin(ScrollTrigger);

      // Seleccionamos todos los elementos con la clase .component
      const elements = document.querySelectorAll('.xd2');
  
      elements.forEach((element) => {
        // Aseguramos que el elemento es de tipo HTMLElement
        const el = element as HTMLElement;
  
        // Usamos GSAP para animar el elemento mientras se hace scroll
        gsap.fromTo(el,
          { scale: 0.8  },  // Comienza con un tamaño pequeño
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
}
