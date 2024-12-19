import { CommonModule,NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../shared/domain/product';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { GlobalStateService } from '../../shared/servicios/global-state.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule,CarouselModule, ButtonModule, TagModule,TooltipModule,DialogModule,FormsModule,NgOptimizedImage],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
})
export class ProyectosComponent implements OnInit {

  visible: boolean = false;
  dialogData: string = '';  // Almacena los datos dinámicos del diálogo
  dialogDataParrafo: string = '';  // Almacena los datos dinámicos del diálogo
  showDialog(data: string,parrafo:string): void {
       this.dialogData = data; // Asigna los datos que quieres pasar al diálogo
       this.dialogDataParrafo = parrafo;
      this.visible = true;
  }
  products: Product[] = [];
  getIconFormat(tech: string): string {
    const svgIcons = ['next']; // Lista de tecnologías con formato .svg
    const webpIcons = ['java','react']; // Lista de tecnologías con formato .webp
  
    if (svgIcons.includes(tech.toLowerCase())) {
      return '.svg';
    } else if (webpIcons.includes(tech.toLowerCase())) {
      return '.webp';
    } else {
      return '.png'; // Formato por defecto
    }
  }
  displayImageDialog: boolean = false;
  selectedImage: string | null = null;

  showImageDialog(image: string) {
    this.selectedImage = image;
    this.displayImageDialog = true;
  }
  onTouchMove(event: TouchEvent) {
    const initialY = event.touches[0].clientY;
    
    // Agregamos el listener con el type assertion
    (event.target as HTMLElement)?.addEventListener('touchmove', (e) => {
      const touchEvent = e as TouchEvent; // Aseguramos que el evento sea de tipo TouchEvent
      const currentY = touchEvent.touches[0].clientY;
      if (Math.abs(currentY - initialY) > 10) {
        e.stopPropagation(); // Permite el desplazamiento vertical
      }
    });
  }
    responsiveOptions: any[] | undefined;

    constructor(private productService: GlobalStateService) {}
    public eventos = inject(GlobalStateService);
    public isDark = signal(false);
    ngOnInit():void {  

       this.eventos.theme$.subscribe((theme)=>{
        this.isDark.update(()=>theme.darktheme)
       })
        this.productService.getProducts().then((products) => {
            this.products = products;
        });

       this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
    ngAfterViewInit() {
      gsap.registerPlugin(ScrollTrigger);
  
      // Seleccionamos todos los elementos con la clase .component
      const elements = document.querySelectorAll('.xd4');
  
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
