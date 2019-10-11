import { TestBed } from '@angular/core/testing';

import { PoeninjaserviceService } from './poeninjaservice.service';

describe('PoeninjaserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoeninjaserviceService = TestBed.get(PoeninjaserviceService);
    expect(service).toBeTruthy();
  });
});
