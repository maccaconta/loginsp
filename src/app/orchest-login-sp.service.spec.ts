import { TestBed } from '@angular/core/testing';

import { OrchestLoginSPService } from './orchest-login-sp.service';

describe('OrchestLoginSPService', () => {
  let service: OrchestLoginSPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrchestLoginSPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
