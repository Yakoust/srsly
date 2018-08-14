import { TestBed, inject } from '@angular/core/testing';

import { JokersApiService } from './jokers-api.service';

describe('JokersApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JokersApiService],
    });
  });

  it('should be created', inject([JokersApiService], (service: JokersApiService) => {
    expect(service).toBeTruthy();
  }));
});
