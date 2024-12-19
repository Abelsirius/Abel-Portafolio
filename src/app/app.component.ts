import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal, viewChildren } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { HeaderComponent } from "./shared/componentes/header/header.component";
import { FooterComponent } from "./portafolio/footer/footer.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';
import { GlobalStateService } from './shared/servicios/global-state.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, Header, MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ProgressSpinnerModule, RippleModule, HeaderComponent, FooterComponent,ToastModule,ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host:{
  '(document:click)':'handleClick($event)'
  }
})
export class AppComponent  implements OnInit{
  event = inject(GlobalStateService);
  title = 'AbelDeveloper';
  isLoading: boolean = false; // Control del spinner
  private currentUrl: string = ''; // Guarda la URL actual
  private isMainPage: boolean = true; // Indica si está en la página principal (inicio)
  private targetSection: string =''; // Sección a la que se desplazará al regresar a la página principal
  public isDarkPage = signal<boolean>(false);
  public clickBtn  = viewChildren(HeaderComponent);
  constructor(private router: Router) {
   
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const isSameRoute = event.url === this.currentUrl;
        const isNavigatingToMain = event.url === '/' || event.url === '/inicio';

        if (!isSameRoute) {
          if (isNavigatingToMain) {
            this.isMainPage = true;
          } else {
            this.isMainPage = false;
          }
          this.isLoading = true; // Activa el spinner al cambiar de ruta
        }
      }

      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;

        if (this.isMainPage && this.targetSection) {
          // Si estamos en la página principal y hay una sección objetivo
          setTimeout(() => {
            this.scrollToElement(this.targetSection);
            this.targetSection = ''; // Resetea la sección objetivo
          }, 1000); // Ajusta este tiempo si es necesario
        }

        setTimeout(() => {
          this.isLoading = false; // Oculta el spinner tras un breve retraso
        }, 1000);
      }
    });
  }
  ngOnInit(): void {
    this.event.theme$.subscribe((theme)=>{
      console.log('CAMBIO EL OBSERVABLE')
      this.isDarkPage.update(()=>theme.darktheme)
    localStorage.setItem('dark-theme',theme.darktheme?'dark':'light');

     })
  }

  handClick(key:string){
    this.event.changeTheme(!this.isDarkPage());
  }

  // Configura la sección objetivo y navega
  navigateToSection(sectionId: string ): void {
    if (this.currentUrl === '/' || this.currentUrl === '/inicio') {
      // Si estamos en la página principal, desplázate directamente
      this.scrollToElement(sectionId);
    } else {
      // Si estamos fuera de la página principal, navega y luego desplázate
      this.targetSection = sectionId;
      this.router.navigateByUrl('/inicio');
    }
  }

  private scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

   handleClick(event:Event){
    const elemento = event.target as HTMLElement;
    console.log(elemento.innerText);
    this.clickBtn().forEach(element => {
         element.eventPressedClick(elemento.innerText)
    });
   }
}
