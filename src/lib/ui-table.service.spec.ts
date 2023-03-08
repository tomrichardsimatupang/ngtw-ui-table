import { TestBed } from '@angular/core/testing';

import { UiTableService } from './ui-table.service';

describe('UiTableService', () => {
  let service: UiTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
