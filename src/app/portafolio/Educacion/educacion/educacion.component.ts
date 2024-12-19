import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GlobalStateService } from '../../../shared/servicios/global-state.service';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { TestWebWorkerComponent } from '../../../shared/componentes/test-web-worker/test-web-worker.component';

@Component({
  selector: 'app-educacion',
  standalone: true,
  imports: [ButtonModule,TestWebWorkerComponent],
  templateUrl: './educacion.component.html',
  styleUrl: './educacion.component.css'
})
export class EducacionComponent implements OnInit {
  
  public eventos = inject(GlobalStateService);
  public isDark = signal(false);
  constructor(private router:Router){

  }
  ngOnInit(): void {
    this.eventos.theme$.subscribe((theme)=>{
        this.isDark.update(()=> theme.darktheme)
    })
  }

   public onHandEvent(event: any):void{
    this.eventos.onRippleEffect(event);
    this.eventos.handleClick(this.router,'contactoSeccion')
   }
   ngAfterViewInit() {
    gsap.from('.component', { 
      scale: 0.5, 
      duration: 1.5, 
      ease: 'power3.out' 
    });
}
}
