import { TestBed } from '@angular/core/testing';

import { DatabaseManagementService } from './database-management.service';

describe('DatabaseManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseManagementService = TestBed.get(DatabaseManagementService);
    expect(service).toBeTruthy();
  });
});
