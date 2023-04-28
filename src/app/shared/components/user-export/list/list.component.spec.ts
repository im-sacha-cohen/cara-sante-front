import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExportListComponent } from './list.component';

describe('UserExportListComponent', () => {
  let component: UserExportListComponent;
  let fixture: ComponentFixture<UserExportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
