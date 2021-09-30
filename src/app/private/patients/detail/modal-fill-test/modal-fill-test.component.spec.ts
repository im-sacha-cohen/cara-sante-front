import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFillTestComponent } from './modal-fill-test.component';

describe('ModalFillTestComponent', () => {
  let component: ModalFillTestComponent;
  let fixture: ComponentFixture<ModalFillTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFillTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFillTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
