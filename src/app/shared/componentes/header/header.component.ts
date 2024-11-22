import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef, Renderer2, inject} from '@angular/core';
import { MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { GlobalStateService } from '../../servicios/global-state.service';
import { NavLinkComponent } from "../../../portafolio/ui-elements/nav-link/nav-link.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SpeedDialModule, ToastModule, NavLinkComponent],
  providers: [MessageService,GlobalStateService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  
})
export class HeaderComponent {
  dropdownOpen = false;
  mobileMenuOpen = false;
  isScrolled = false;
  sections: HTMLElement[] = [];
  _eventos = inject(GlobalStateService);

  constructor(private renderer: Renderer2, private el: ElementRef)
  {

  }

  links = [
    { label: 'Inicio', section: 'inicio' },
    { label: 'Sobre mí', section: 'mi' },
    { label: 'Habilidades', section: 'habilidades' },
    { label: 'Servicios', section: 'servicios' },
    { label: 'Proyectos', section: 'proyectos' },
    { label: 'Contactar', section: 'contactoSeccion' },
  ];

  ngOnInit(): void {
    // Almacena las secciones para mejorar el rendimiento
    this.sections = Array.from(document.querySelectorAll('section'));
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

  }


  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // Cierra el menú desplegable al hacer clic fuera
  @HostListener('document:click', ['$event.target'])
  closeDropdown(target: HTMLElement): void {
    const clickedInside = this.el.nativeElement.contains(target);
    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }
  activeSection: string = 'inicio'; // Sección activa por defecto

  setActive(section: string): void {
    this.activeSection = section;
  }
  setActiveSection(section: string): void {
    this.activeSection = section;
    this._eventos.scrollToElement(section);
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  activeLink: string = 'inicio';
  setActiveLink(link: string): void {
    this.activeLink = link;
    this._eventos.scrollToElement(link);
  }

  // Método para detectar la sección visible en el scroll
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 50;

    let currentSection = 'inicio'; // Default
    this.sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.clientHeight;

      if (sectionTop <= 50 && sectionTop + sectionHeight > 50) {
        currentSection = section.id;
      }
    });

    this.activeSection = currentSection;
  }
}
