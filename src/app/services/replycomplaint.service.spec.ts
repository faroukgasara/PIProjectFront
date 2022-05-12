import { TestBed } from '@angular/core/testing';

import { ReplycomplaintService } from './replycomplaint.service';

describe('ReplycomplaintService', () => {
  let service: ReplycomplaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplycomplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
