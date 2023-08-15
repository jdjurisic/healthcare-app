import { TestBed } from '@angular/core/testing';

import { PatientsListResolver } from './patients-list.resolver';

describe('PatientsListResolver', () => {
  let resolver: PatientsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PatientsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
