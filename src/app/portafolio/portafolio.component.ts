import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, inject, Input, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { GlobalStateService } from '../shared/servicios/global-state.service';
import { CommonModule } from '@angular/common';
import { fadeIn, slideInLeft, zoomIn } from '../shared/animations';
import { SobreMiComponent } from "./sobre-mi/sobre-mi.component";
import { HabilidadesComponent } from "./habilidades/habilidades.component";
import { ServiciosComponent } from "./servicios/servicios.component";
import { ProyectosComponent } from "./proyectos/proyectos.component";
import { ContanctoComponent } from "./contancto/contancto.component";
import gsap from 'gsap';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [ButtonModule, RippleModule, CommonModule, SobreMiComponent, HabilidadesComponent, ServiciosComponent, ProyectosComponent, ContanctoComponent],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css',
  animations: [fadeIn, slideInLeft, zoomIn], // Importa las animaciones necesarias
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class PortafolioComponent implements AfterViewInit{
  public eventos = inject(GlobalStateService);
  constructor(){
    console.log('PortafolioComponent cargado');
  }
  showElement = false;
  ngAfterViewInit() {
      gsap.from('.component', { 
        scale: 0.5, 
        duration: 1.5, 
        ease: 'power3.out' 
      });
  }

}
