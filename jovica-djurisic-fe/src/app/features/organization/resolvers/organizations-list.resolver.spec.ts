import { TestBed } from '@angular/core/testing';

import { OrganizationsListResolver } from './organizations-list.resolver';

describe('OrganizationsListResolver', () => {
  let resolver: OrganizationsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrganizationsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
