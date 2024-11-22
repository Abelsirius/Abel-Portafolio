import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.css'
})
export class NavLinkComponent {
  @Input() label!: string; // Etiqueta del enlace
  @Input() active: boolean = false; // Si el enlace está activo
  @Input() isScrolled: boolean = false; // Estado de scroll
  @Output() linkClick = new EventEmitter<void>(); // Evento para manejar el clic

  handleClick(): void {
    this.linkClick.emit(); // Emite el evento de clic al padre
  }
}
