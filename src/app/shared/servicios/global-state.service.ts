import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class GlobalStateService {
  constructor() {}

  onRippleEffect(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;

    // Crear el elemento de la onda manualmente
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Calcular la posición del clic para la animación de onda
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    // Agregar el elemento de onda al botón
    button.appendChild(ripple);

    // Eliminar el elemento de la onda después de la animación
    setTimeout(() => {
        ripple.remove();
    }, 600); // Coincide con la duración de la animación en CSS
}
scrollToElement(elementId: string, duration: number = 1000): void {
    const targetPosition = document.getElementById(elementId)?.offsetTop || 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

getProductsData() {
    return [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Peru Travel',
            tecnologia: ['HTML', 'CSS', 'Java'],
            urlPage: 'https://abelsirius.github.io/PeruTravel/',
            description: 'Peru Travel, un sitio web diseñado para promocionar destinos turísticos y experiencias de viaje por Perú...',
            image: 'assets/travel.png',

        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Grupo Valcorp',
            tecnologia: ['Angular'],
            urlPage: 'https://grupovalcorp.pe/home',
            description: 'Grupo Valcorp es una empresa enfocada en la venta de terrenos y viviendas, conocida por su calidad y confianza...',
            image: 'assets/valcorp.png',

        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'DSumare',
            tecnologia: ['Next'],
            urlPage: 'https://siriusboss.shop/#Inicio',
            description: 'Desumare, un sitio web enfocado en promocionar y facilitar reservas para un restaurante...',
            image: 'assets/desumare.png',

        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Dayser Shop',
            tecnologia: ['React'],
            urlPage: 'https://abelsirius.github.io/DeyserShop/',
            description: 'Dayser Shop, un sitio web de comercio electrónico diseñado para exhibir productos de moda y accesorios...',
            image: 'assets/shop.png',
        },
        {
            id: '1004',
            code: 'h456wer53',
            name: 'UCV TRILCE',
            tecnologia: ['Angular', 'tailwind'],
            description: 'El Módulo de Sílabos (TRILCE) es un proyecto que desarrollé para la Universidad César Vallejo...',
            image: 'assets/ucv silabo.png',
            demo: 'no',
        },
        {
            id: '1005',
            code: 'av2231fwg',
            name: 'UCV TRILCE',
            tecnologia: ['Angular', 'tailwind'],
            description: 'Desarrollé el Módulo de Configuraciones del sistema TRILCE de la UCV...',
            image: 'assets/ucv configuracion.png',
            ngSrcset: 'assets/ucv configuracion-1920w.png 1040h',
            demo: 'no',
        },
    ];

}
getProducts() {
  return Promise.resolve(this.getProductsData());
}
}