import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalStateService } from '../../../shared/servicios/global-state.service';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.css'
})
export class NavLinkComponent {
  @Input() label!: string; // Etiqueta del enlace
  @Input() section!: string;
  @Input() active: boolean = false; // Si el enlace está activo
  @Input() isScrolled: boolean = false; // Estado de scroll
  @Input() link?: string ; // Estado de scroll
  @Output() linkClick = new EventEmitter<void>(); // Evento para manejar el clic
  private eventos = inject(GlobalStateService);
  constructor(private router: Router) {}

  handleClick() {
    const currentRoute = this.router.url;
    if (currentRoute !== '') {
      // Si no estás en la página "inicio", redirige y luego haz scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.eventos.scrollToElement(this.section);
        }, 1000); // Asegura que la página se haya cargado
      });
    } else {
      // Si ya estás en "inicio", solo realiza el scroll
      this.scrollToSection();
    }

    // Emitir evento si es necesario
    this.linkClick.emit();
  }

  private scrollToSection() {
    const targetElement = document.getElementById(this.section);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.warn(`No se encontró el elemento con ID: ${this.section}`);
    }
  }
}
