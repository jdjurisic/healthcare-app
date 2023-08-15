import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PageDto } from 'src/app/core/models/page.dto';
import { Patient } from 'src/app/core/models/patient';
import { PatientService } from 'src/app/core/services/patient.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsListResolver implements Resolve<PageDto<Patient>> {
  constructor(
    private patientService: PatientService,
    private activeRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PageDto<Patient>> {
    const page = Number(this.activeRoute.snapshot.queryParams['page']);
    return this.patientService.getByPage(page ? page : 1, 5, '');
  }
}
