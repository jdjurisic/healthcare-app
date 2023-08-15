import { TestBed } from '@angular/core/testing';

import { PractitionersListResolver } from './practitioners-list.resolver';

describe('PractitionersListResolver', () => {
  let resolver: PractitionersListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PractitionersListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
