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
            subImg: 'assets/travel.png',
            urlPage: 'https://abelsirius.github.io/PeruTravel/',
            description: 'Peru Travel, un sitio web diseñado para promocionar destinos turísticos y experiencias de viaje por Perú...',
            image: 'assets/travel.png',
            sMasInfo:'Peru Travel - Proyecto   sitio web fue creado desde cero con un enfoque en funcionalidad y diseño. Utilicé mis conocimientos en HTML5, CSS3 y JavaScript para construir una plataforma intuitiva y visualmente atractiva, asegurando que cada detalle, desde las animaciones hasta la organización del contenido, ofreciera una experiencia fluida al usuario.El mayor reto fue lograr que el sitio fuera completamente responsive, adaptándose a cualquier dispositivo, y optimizarlo para una navegación rápida y sencilla. Cada sección fue diseñada pensando en cómo el usuario podría explorar los destinos con facilidad, mientras se resaltaban los paisajes y la riqueza cultural del Perú.Este proyecto representa cómo la tecnología y la creatividad pueden unirse para ofrecer soluciones prácticas y significativas.'

        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Grupo Valcorp',
            tecnologia: ['Angular'],
            urlPage: 'https://grupovalcorp.pe/home',
            description: 'Grupo Valcorp es una empresa enfocada en la venta de terrenos y viviendas, conocida por su calidad y confianza...',
            image: 'assets/valcorp.png',
            subImg: 'assets/valcorp.png',
            sMasInfo:'Para este proyecto,  desarrollé una plataforma web moderna y funcional para Grupo Valcorp, una empresa líder en la venta de terrenos y viviendas. Utilicé Angular como framework principal para crear una experiencia fluida, dinámica y fácil de navegar, optimizando cada detalle para adaptarse a las necesidades de los usuarios.El enfoque principal fue resaltar los proyectos inmobiliarios de manera atractiva y ordenada, permitiendo que los clientes exploren opciones de manera clara. Además, implementé características interactivas y optimicé la web para dispositivos móviles, garantizando una experiencia responsive y accesible.Este proyecto demuestra cómo la tecnología puede potenciar la presencia digital de una empresa, conectándola de manera efectiva con sus clientes.'


        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'DSumare',
            tecnologia: ['Next'],
            urlPage: 'https://siriusboss.shop/#Inicio',
            description: 'Desumare, un sitio web enfocado en promocionar y facilitar reservas para un restaurante...',
            image: 'assets/desumare.png',
            subImg: 'assets/desumare.png',
            sMasInfo:'Este proyecto es una práctica personal en la que estoy construyendo un sitio web para un restaurante, diseñado para promocionar sus servicios y facilitar reservas de manera eficiente. Utilicé Next.js para aprovechar su capacidad de renderizado del lado del servidor y su enfoque modular, logrando un rendimiento óptimo y una estructura escalable.El objetivo principal ha sido desarrollar una plataforma que presente el menú, los horarios y los servicios del restaurante de forma atractiva y funcional. Además, estoy explorando la integración de un sistema de reservas dinámico y una experiencia de usuario fluida en dispositivos móviles y de escritorio.Aunque el proyecto aún está en desarrollo, ha sido una excelente oportunidad para aplicar y fortalecer mis conocimientos en React, Next.js y diseño web moderno.'

        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Dayser Shop',
            tecnologia: ['React'],
            urlPage: 'https://abelsirius.github.io/DeyserShop/',
            description: 'Dayser Shop, un sitio web de comercio electrónico diseñado para exhibir productos de moda y accesorios...',
            image: 'assets/shop.png',
            subImg: 'assets/shop.png',
            sMasInfo:'Dayser Shop es un sitio web de comercio electrónico creado para exhibir productos de moda y accesorios de forma visualmente atractiva y funcional. Utilicé React.js para desarrollar una interfaz dinámica y modular, enfocándome en el rendimiento y la experiencia de usuario.Gracias a las capacidades de React, el sitio cuenta con componentes reutilizables, navegación fluida y una estructura optimizada que facilita la gestión de productos y categorías. Además, el diseño responsive garantiza que los usuarios puedan explorar cómodamente desde cualquier dispositivo.Este proyecto fue una oportunidad para aplicar mis conocimientos en React.js, creando una solución moderna y eficiente que combina funcionalidad y diseño para satisfacer las necesidades de un negocio digital.'

        },
        {
            id: '1004',
            code: 'h456wer53',
            name: 'UCV TRILCE',
            tecnologia: ['Angular', 'tailwind'],
            description: 'El Módulo de Sílabos (TRILCE) es un proyecto que desarrollé para la Universidad César Vallejo...',
            image: 'assets/ucv-logo.jpg',
            subImg: 'assets/ucv silabo.png',
            demo: 'no',
            sMasInfo:'Desarrollé el módulo de Sílabos para el sistema TRILCE de la Universidad César Vallejo, diseñado para simplificar la creación, gestión y seguimiento de sílabos académicos. Este módulo permite a los docentes estructurar contenido de manera organizada y accesible, optimizando la interacción con los estudiantes y mejorando la calidad educativa. Mi enfoque fue brindar una herramienta intuitiva, eficiente y alineada con los estándares académicos de la universidad.'
        },
        {
            id: '1005',
            code: 'av2231fwg',
            name: 'UCV TRILCE',
            tecnologia: ['Angular', 'tailwind'],
            description: 'Desarrollé el Módulo de Configuraciones del sistema TRILCE de la UCV...',
            subImg: 'assets/ucv configuracion.png',
            image: 'assets/ucv-logo.jpg',
            ngSrcset: 'assets/ucv configuracion-1920w.png 1040h',
            demo: 'no',
            sMasInfo:'Desarrollé el módulo de Sílabos y la sección de Configuraciones para el sistema TRILCE de la Universidad César Vallejo.El módulo de Sílabos permite a los docentes estructurar y gestionar contenidos académicos de manera eficiente, facilitando su uso en el entorno educativo.La sección de Configuraciones brinda a los administradores la capacidad de personalizar parámetros clave del sistema, como cronogramas académicos, filiales, centros productivos y reglas específicas para el manejo de información académica. Ambos desarrollos fueron diseñados con un enfoque en la usabilidad y la eficiencia, optimizando los procesos administrativos y académicos para la comunidad universitaria.'
        },
    ];

}
getProducts() {
  return Promise.resolve(this.getProductsData());
}
}