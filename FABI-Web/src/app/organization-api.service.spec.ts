import { TestBed, inject, async } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OrganizationApiService } from './organization-api.service';

describe('OrganizationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      OrganizationApiService,
    ]
  }));

  it('should be created', () => {
    const service: OrganizationApiService = TestBed.get(OrganizationApiService);
    expect(service).toBeTruthy();
  });

});

