import { TestBed } from '@angular/core/testing';

import { ShowEventService } from './show-event.service';

describe('ShowEventService', () => {
  let service: ShowEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
