import { trigger, transition, style, animate, keyframes, query, stagger } from '@angular/animations';

// Animación de Fade In
export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }), // Estado inicial: completamente invisible
      animate('1s ease-in', style({ opacity: 1 })) // Estado final: visible
    ])
  ]);

// Animación de Fade Out
export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    animate('500ms ease-out', style({ opacity: 0 }))
  ])
]);

// Animación de Slide In (desde la izquierda)
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

// Animación de Slide Out (hacia la derecha)
export const slideOutRight = trigger('slideOutRight', [
  transition(':leave', [
    animate('500ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
  ])
]);

// Animación con Stagger (aparece en secuencia)
export const staggeredFadeIn = trigger('staggeredFadeIn', [
  transition(':enter', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger('100ms', [
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

// Animación de Zoom In
export const zoomIn = trigger('zoomIn', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
  ])
]);

// Animación de Zoom Out
export const zoomOut = trigger('zoomOut', [
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
  ])
]);
