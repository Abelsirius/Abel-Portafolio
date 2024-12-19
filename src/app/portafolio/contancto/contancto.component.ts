import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { GlobalStateService } from '../../shared/servicios/global-state.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-contancto',
  standalone: true,
  imports: [ConfirmDialogModule,FormsModule, InputTextModule, FloatLabelModule,CommonModule,ReactiveFormsModule,ToastModule,ProgressSpinnerModule],
  templateUrl: './contancto.component.html',
  styleUrls: ['./contancto.component.css'],
  providers:[MessageService,ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush
  

})
export class ContanctoComponent  implements AfterViewInit{
  value: string | undefined;
  public eventos = inject(GlobalStateService);
  public platform = inject(PLATFORM_ID);
  contactForm: FormGroup;
  isLoading: boolean = false; // Controla el estado del loading spinner
  constructor(private fb: FormBuilder,private confirmationService: ConfirmationService,private messageService: MessageService) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      numero: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }


  // Método que se ejecuta al enviar el formulario
  onSubmit(event:any) {
    if (this.contactForm.valid) {
      this.isLoading = true;
      const templateParams = {
        nombre: this.contactForm.value.nombre,
        email: this.contactForm.value.email,
        numero: this.contactForm.value.numero,
        mensaje: this.contactForm.value.mensaje
      };

      emailjs
        .send(
          'service_ruegz9a', // Reemplaza con tu Service ID
          'template_k8rbl39', // Reemplaza con tu Template ID
          templateParams,
          'nZNESTK-u3M2vN1xP' // Reemplaza con tu Public Key
        )
        .then(
          (response) => {
            this.isLoading = false; // Ocultar el spinner
            this.messageService.add({
              severity: 'success',
              summary: 'Mensaje enviado',
              detail: 'Tu mensaje fue enviado exitosamente.',
              life: 2200
            });
            console.log('Correo enviado', response.status, response.text);
            this.contactForm.reset(); // Limpia el formulario después de enviarlo
          },
          (error) => {
            this.isLoading = false; // Ocultar el spinner
            this.messageService.add({
              severity: 'error',
              summary: 'Error al enviar',
              detail: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.',
              life: 2200
            });
            console.error('Error al enviar el correo:', error);
          }
        );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario inválido',
        detail: 'Por favor, completa todos los campos correctamente.',
        life: 2200
      });
    }
  }
  ngAfterViewInit() {
    if(isPlatformBrowser(this.platform)){
      gsap.registerPlugin(ScrollTrigger);

      // Seleccionamos todos los elementos con la clase .component
      const elements = document.querySelectorAll('.xd5');
  
      elements.forEach((element) => {
        // Aseguramos que el elemento es de tipo HTMLElement
        const el = element as HTMLElement;
  
        // Usamos GSAP para animar el elemento mientras se hace scroll
        gsap.fromTo(el,
          { scale: 0.7 },  // Comienza con un tamaño pequeño
          { 
            scale: 1,  // Se agranda a su tamaño normal
            ease: 'power3.out',  // Suavizado de la animación
            delay: 0.5,  // Espera medio segundo antes de comenzar la animación
            scrollTrigger: {
              trigger: el,  // El trigger es el propio elemento
              start: 'top 80%',  // Comienza cuando el 80% del elemento entra en el viewport
              end: 'top 20%',    // Termina cuando el 20% del elemento sale del viewport
              scrub: true,       // Sincroniza la animación con el scroll
              markers: false     // Desactivar los marcadores para pruebas
            }
          }
        );
      });
    }

  }
}
