import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef, Renderer2, inject, output, viewChild, signal, input, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { GlobalStateService } from '../../servicios/global-state.service';
import { NavLinkComponent } from "../../../portafolio/ui-elements/nav-link/nav-link.component";
import { NavigationEnd, Router } from '@angular/router';
import { Button } from 'primeng/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SpeedDialModule, ToastModule, NavLinkComponent],
  providers: [MessageService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host:{
     '[class.queee]' : 'styleRojo()'
  }
  
})
export class HeaderComponent implements OnInit{
  dropdownOpen = false;
  mobileMenuOpen = false;
  isScrolled = false;
   
  sections: HTMLElement[] = [];
  _eventos = inject(GlobalStateService);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isPressed = signal<boolean>(false);
  public isDark = signal<boolean>(false);
  public styleRojo = input(false,{
    transform:(value:boolean | string)=> typeof value === 'string'?value === '' : value 
  });
  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router)
  {

  }

  links = [
    { label: 'Inicio', section: 'inicio', linkRouter:'/inicio' },
    { label: 'Sobre mí', section: 'mi' },
    { label: 'Habilidades', section: 'habilidades',linkRouter:'/inicio' },
    { label: 'Experiencia', section: 'servicios',linkRouter:'/inicio' },
    { label: 'Proyectos', section: 'proyectos',linkRouter:'/inicio' },
    { label: 'Contactar', section: 'contactoSeccion',linkRouter:'/inicio' },
  ];

  handClick (evnet:MouseEvent){
    const value = this.contentValue()?.nativeElement.innerText;
    this.onClick.emit('Light');
    this._eventos.onRippleEffect(evnet);
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSections();
      }
    });
    this._eventos.theme$.subscribe((theme)=>{
      this.isDark.update(()=>theme.darktheme);
    })
  
    // Detecta secciones al cargar
    this.updateSections();
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
    if (this.router.url === '/' || this.router.url === '/inicio') {
      // Si estamos en la página principal, realiza el scroll interno
      this._eventos.scrollToElement(section);
    } else {
      // Si estamos fuera de la página principal, navega a inicio y activa el spinner
      this.router.navigateByUrl('/inicio').then(() => {
        setTimeout(() => this._eventos.scrollToElement(section), 100);
      });
    }
  }
  navigateTo(section: string): void {
    this._eventos.scrollToElement(section);
  }

  activeLink: string = 'inicio';
  setActiveLink(link: string): void {
    this.activeLink = link;
    this._eventos.scrollToElement(link);
    this.dropdownOpen = false;
  }

  public handEvent(seccion:string):void{
   if(this.router.url !== ''){
    this._eventos.handleClick(this.router,seccion)
   }
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
  private updateSections(): void {
    setTimeout(() => {
      this.sections = Array.from(document.querySelectorAll('section'));
      console.log('Secciones detectadas:', this.sections.map((s) => s.id));
    }, 100);
  }

  public eventPressedClick(key:string){

     if(!this.contentValue()) return

     const value = this.contentValue()!.nativeElement.innerText;

     if(value != key) return ;
    
     this.isPressed.set(true);

     setTimeout(()=>{
      this.isPressed.set(false);
     },200)

  }
}
