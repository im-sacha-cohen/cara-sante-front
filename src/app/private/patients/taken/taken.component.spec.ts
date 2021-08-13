import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenPatientComponent } from './taken.component';

describe('TakenComponent', () => {
  let component: TakenPatientComponent;
  let fixture: ComponentFixture<TakenPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakenPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
