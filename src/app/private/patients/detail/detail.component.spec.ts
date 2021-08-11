import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailToTakePatientComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailToTakePatientComponent;
  let fixture: ComponentFixture<DetailToTakePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailToTakePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailToTakePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
