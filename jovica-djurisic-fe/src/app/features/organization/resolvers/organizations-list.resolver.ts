import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Organization } from 'src/app/core/models/organization';
import { PageDto } from 'src/app/core/models/page.dto';
import { OrganizationService } from 'src/app/core/services/organization.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsListResolver
  implements Resolve<PageDto<Organization>>
{
  constructor(
    private organizationService: OrganizationService,
    private activeRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PageDto<Organization>> {
    const page = Number(this.activeRoute.snapshot.queryParams['page']);
    return this.organizationService.getByPage(page ? page : 1, 5, '');
  }
}
