import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { GlobalStateService } from '../../shared/servicios/global-state.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-contancto',
  standalone: true,
  imports: [ConfirmDialogModule,FormsModule, InputTextModule, FloatLabelModule,CommonModule,ReactiveFormsModule,ToastModule,ProgressSpinnerModule],
  templateUrl: './contancto.component.html',
  styleUrl: './contancto.component.css',
  providers:[GlobalStateService,MessageService,ConfirmationService]

})
export class ContanctoComponent  {
  value: string | undefined;
  public eventos = inject(GlobalStateService);
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


  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}
  // Método que se ejecuta al enviar el formulario
  onSubmit() {
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
}
