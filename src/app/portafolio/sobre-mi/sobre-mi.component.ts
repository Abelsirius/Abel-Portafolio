import { Component, inject } from '@angular/core';
import { GlobalStateService } from '../../shared/servicios/global-state.service';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css',
  providers:[GlobalStateService]
})
export class SobreMiComponent {
  public eventos = inject(GlobalStateService);
  
}
