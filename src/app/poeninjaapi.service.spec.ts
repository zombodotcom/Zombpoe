import { TestBed } from '@angular/core/testing';

import { PoeninjaapiService } from './poeninjaapi.service';

describe('PoeninjaapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoeninjaapiService = TestBed.get(PoeninjaapiService);
    expect(service).toBeTruthy();
  });
});
