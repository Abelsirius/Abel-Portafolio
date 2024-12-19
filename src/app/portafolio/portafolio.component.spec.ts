import { ComponentFixture, TestBed } from '@angular/core/testing';
import PortafolioComponent from './portafolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa esto

describe('PortafolioComponent', () => {
  let component: PortafolioComponent;
  let fixture: ComponentFixture<PortafolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortafolioComponent,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
