import { TestBed } from '@angular/core/testing';

import { MicService } from './mic.service';

describe('MicService', () => {
  let service: MicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
