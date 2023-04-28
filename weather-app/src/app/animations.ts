import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
transition(':enter', [
style({ opacity: 0 }),
animate('500ms ease-out', style({ opacity: 1 })),
]),
transition(':leave', [
animate('500ms ease-out', style({ opacity: 0 })),
]),
]);