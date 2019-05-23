import { TestBed } from '@angular/core/testing';

import { AdminAPIService } from './admin-api.service';

describe('AdminAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAPIService = TestBed.get(AdminAPIService);
    expect(service).toBeTruthy();
  });
});
