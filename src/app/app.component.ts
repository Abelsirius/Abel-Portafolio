import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { PortafolioComponent } from "./portafolio/portafolio.component";
import { RippleModule } from 'primeng/ripple';
import { HeaderComponent } from "./shared/componentes/header/header.component";
import { SobreMiComponent } from "./portafolio/sobre-mi/sobre-mi.component";
import { HabilidadesComponent } from "./portafolio/habilidades/habilidades.component";
import { ServiciosComponent } from "./portafolio/servicios/servicios.component";
import { ProyectosComponent } from "./portafolio/proyectos/proyectos.component";
import { ContanctoComponent } from "./portafolio/contancto/contancto.component";
import { FooterComponent } from "./portafolio/footer/footer.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ProgressSpinnerModule, PortafolioComponent, RippleModule, HeaderComponent, SobreMiComponent, HabilidadesComponent, ServiciosComponent, ProyectosComponent, ContanctoComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AbelDeveloper';
  isLoading: boolean = true; // Estado inicial del loading
  ngOnInit() {
    this.titleService.setTitle('AbelDeveloper');
    this.meta.addTags([
      { name: 'description', content: 'Desarrollador de software y portafolio' },
      { name: 'author', content: 'Abel' },
      { name: 'keywords', content: 'desarrollador, angular, portafolio' }
    ]);
  }
  constructor(private router: Router,private meta: Meta, private titleService: Title) {
    // Escucha los eventos de navegación del router
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true; // Muestra el spinner al iniciar la navegación
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false; // Oculta el spinner al terminar la navegación
        }, 1000); // Puedes ajustar este tiempo si es necesario
      }
    });
  }
}
