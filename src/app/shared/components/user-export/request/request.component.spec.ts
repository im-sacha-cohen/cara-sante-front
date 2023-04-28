import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExportRequestComponent } from './request.component';

describe('UserExportRequestComponent', () => {
  let component: UserExportRequestComponent;
  let fixture: ComponentFixture<UserExportRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExportRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExportRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
