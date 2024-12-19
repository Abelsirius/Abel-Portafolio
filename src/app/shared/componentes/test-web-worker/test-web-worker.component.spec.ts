import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWebWorkerComponent } from './test-web-worker.component';

describe('TestWebWorkerComponent', () => {
  let component: TestWebWorkerComponent;
  let fixture: ComponentFixture<TestWebWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWebWorkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWebWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
