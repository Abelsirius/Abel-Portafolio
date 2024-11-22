import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperinciaComponent } from './experincia.component';

describe('ExperinciaComponent', () => {
  let component: ExperinciaComponent;
  let fixture: ComponentFixture<ExperinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperinciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
