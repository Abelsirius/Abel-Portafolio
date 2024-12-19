import { Component, inject } from '@angular/core';
import { GlobalStateService } from '../../shared/servicios/global-state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  _eventos = inject(GlobalStateService);
}
