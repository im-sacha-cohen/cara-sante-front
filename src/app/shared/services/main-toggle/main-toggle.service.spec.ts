import { TestBed } from '@angular/core/testing';

import { MainToggleService } from './main-toggle.service';

describe('MainToggleService', () => {
  let service: MainToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
