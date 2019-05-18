import { TestBed } from '@angular/core/testing';

import { ApiConnectionService } from './api-connection.service';

describe('ApiConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiConnectionService = TestBed.get(ApiConnectionService);
    expect(service).toBeTruthy();
  });
});
