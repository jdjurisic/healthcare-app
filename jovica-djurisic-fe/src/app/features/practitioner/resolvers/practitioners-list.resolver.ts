import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PageDto } from 'src/app/core/models/page.dto';
import { Practitioner } from 'src/app/core/models/practitioner';
import { PractitionerService } from 'src/app/core/services/practitioner.service';

@Injectable({
  providedIn: 'root'
})
export class PractitionersListResolver implements Resolve<PageDto<Practitioner>> {

  constructor(private practitionerService: PractitionerService, private activeRoute: ActivatedRoute) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageDto<Practitioner>> {
    const page = Number(this.activeRoute.snapshot.queryParams['page']);
    return this.practitionerService.getByPage(page? page:1,5,'','',0);
  }
}
