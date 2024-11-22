import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContanctoComponent } from './contancto.component';

describe('ContanctoComponent', () => {
  let component: ContanctoComponent;
  let fixture: ComponentFixture<ContanctoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContanctoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContanctoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
