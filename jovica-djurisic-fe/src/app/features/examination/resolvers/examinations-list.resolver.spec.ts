import { TestBed } from '@angular/core/testing';

import { ExaminationsListResolver } from './examinations-list.resolver';

describe('ExaminationsListResolver', () => {
  let resolver: ExaminationsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ExaminationsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
