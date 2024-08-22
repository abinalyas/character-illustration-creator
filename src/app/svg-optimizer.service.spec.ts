import { TestBed } from '@angular/core/testing';

import { SvgOptimizerService } from './svg-optimizer.service';

describe('SvgOptimizerService', () => {
  let service: SvgOptimizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgOptimizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
