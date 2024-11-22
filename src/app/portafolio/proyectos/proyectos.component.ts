import { CommonModule,NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/domain/product';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { GlobalStateService } from '../../shared/servicios/global-state.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule,CarouselModule, ButtonModule, TagModule,TooltipModule,DialogModule,FormsModule,NgOptimizedImage],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
  providers:[GlobalStateService]
})
export class ProyectosComponent implements OnInit {

  visible: boolean = false;
  dialogData: string = '';  // Almacena los datos dinámicos del diálogo
  showDialog(data: string): void {
       this.dialogData = data; // Asigna los datos que quieres pasar al diálogo
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

    ngOnInit():void {
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


}
