import { TestBed } from '@angular/core/testing';

import { EmployeeDataService } from './employees-data.service';

describe('TodoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeDataService = TestBed.get(EmployeeDataService);
    expect(service).toBeTruthy();
  });
});
