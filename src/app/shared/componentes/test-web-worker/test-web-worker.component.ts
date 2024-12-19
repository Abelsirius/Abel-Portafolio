import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-web-worker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-web-worker.component.html',
  styleUrl: './test-web-worker.component.css'
})
export class TestWebWorkerComponent {
  resultado: number | null = null;

  calcularConWorker(numero: number): void {
    if (typeof Worker !== 'undefined') {
      // Crear el Worker y apuntar al archivo correcto
      const worker = new Worker(new URL('./mi-primer-web-worker.worker', import.meta.url), {
        type: 'module',
      });

      // Enviar datos al Worker
      worker.postMessage(numero);

      // Recibir el resultado del Worker
      worker.onmessage = ({ data }) => {
        this.resultado = data; // Actualiza el resultado
        worker.terminate(); // Finaliza el Worker
      };

      // Manejar errores
      worker.onerror = (error) => {
        console.error('Error en el Web Worker:', error);
      };
    } else {
      console.error('Web Workers no están soportados en este navegador.');
    }
  }
}
