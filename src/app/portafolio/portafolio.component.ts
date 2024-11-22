import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { GlobalStateService } from '../shared/servicios/global-state.service';
import { CommonModule } from '@angular/common';
import { fadeIn, slideInLeft, zoomIn } from '../shared/animations';
@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [ButtonModule,RippleModule,CommonModule],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css',
  providers:[GlobalStateService],
  animations: [fadeIn, slideInLeft, zoomIn] // Importa las animaciones necesarias
})
export class PortafolioComponent {
  public eventos = inject(GlobalStateService);
  showElement = false;

}
