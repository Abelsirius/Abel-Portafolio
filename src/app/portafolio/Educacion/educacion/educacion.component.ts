import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GlobalStateService } from '../../../shared/servicios/global-state.service';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-educacion',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './educacion.component.html',
  styleUrl: './educacion.component.css'
})
export  class EducacionComponent implements OnInit {
  
  public eventos = inject(GlobalStateService);
  public isDark = signal(false);
  public title = inject(Title);
  public meta = inject(Meta);
  public plaform = inject(PLATFORM_ID);

  constructor(private router:Router){

  }
  ngOnInit(): void {
   
    // if(isPlatformBrowser(this.plaform)){
    //   document.title = 'Educacion | Abel'
    // }

    try {
      // Establecer título dinámico
      this.title.setTitle('Educacion | Abel');

      // Actualizar metadatos
      this.meta.updateTag({ name: 'description', content: 'Página de Educación' });
      this.meta.updateTag({ property: 'og:title', content: 'Página de Educación' });
      this.meta.updateTag({ name: 'keywords', content: 'educacion, cursos, carrera, ingenieria de sistemas, front-end, desarrollador web, Abel, Abel Hurtado Sandoval' });

      // Suscribirse al tema global
      this.eventos.theme$.subscribe((theme) => {
        this.isDark.update(() => theme.darktheme);
      });
    } catch (error) {
      console.error('Error al configurar metadatos:', error);
    }
  }

   public onHandEvent(event: any):void{
    this.eventos.onRippleEffect(event);
    this.eventos.handleClick(this.router,'contactoSeccion')
   }
   
   ngAfterViewInit() {
        if(isPlatformBrowser(this.plaform)){
          gsap.from('.component', { 
            scale: 0.5, 
            duration: 1.5, 
            ease: 'power3.out' 
          });
     }

}
}
