import { TestBed, async, inject } from '@angular/core/testing';

import { VerifyTokenGuard } from './verify-token.guard';

describe('VerifyTokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyTokenGuard]
    });
  });

  it('should ...', inject([VerifyTokenGuard], (guard: VerifyTokenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
