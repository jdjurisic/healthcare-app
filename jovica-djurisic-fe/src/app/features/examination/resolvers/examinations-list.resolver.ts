import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Examination } from 'src/app/core/models/examination';
import { PageDto } from 'src/app/core/models/page.dto';
import { ExaminationService } from 'src/app/core/services/examination.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationsListResolver implements Resolve<PageDto<Examination>> {

  constructor(
    private examinationService: ExaminationService,
    private activeRoute: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageDto<Examination>> {
    const page = Number(this.activeRoute.snapshot.queryParams['page']);
    return this.examinationService.getByPage(page? page:1,5,'');
  }
}
