import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakePatientComponent } from './take-patient.component';

describe('TakePatientComponent', () => {
  let component: TakePatientComponent;
  let fixture: ComponentFixture<TakePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
