import { AfterViewInit, Component, HostBinding, inject, Input, input, OnInit, output, signal } from '@angular/core';
import { GlobalStateService } from '../../shared/servicios/global-state.service';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css',
})
export class SobreMiComponent implements AfterViewInit,OnInit {
  public event = inject(GlobalStateService);
  public isDark = signal<boolean>(false);
  ngOnInit(): void {
     this.event.theme$.subscribe((theme)=>{
        this.isDark.update(()=> theme.darktheme)
     })
  }

  public onClick = output<string>();

  public dark = input(false,{
    transform: (value:boolean | string)=> typeof value === 'string' ?  value === '' : value
  });
  
  @HostBinding('.class.dark') get commanStyle(){
    return this.dark();
  }


  public eventos = inject(GlobalStateService);
  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Seleccionamos todos los elementos con la clase .component
    const elements = document.querySelectorAll('.xd');

    elements.forEach((element) => {
      // Aseguramos que el elemento es de tipo HTMLElement
      const el = element as HTMLElement;

      // Usamos GSAP para animar el elemento mientras se hace scroll
      gsap.fromTo(el,
        { scale: 0.6 },  // Comienza con un tamaño pequeño
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
