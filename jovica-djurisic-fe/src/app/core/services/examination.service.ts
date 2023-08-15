import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examination } from '../models/examination';
import { PageDto } from '../models/page.dto';

@Injectable({
  providedIn: 'root',
})
export class ExaminationService {
  readonly controllerUrl = '/examinations';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Examination[]> {
    return this.httpClient.get<Examination[]>(
      `${environment.serverUrl}${this.controllerUrl}`
    );
  }

  getByPage(
    page: number,
    size: number,
    sortBy: string,
    sortOrder: string = 'asc'
  ) {
    return this.httpClient.get<PageDto<Examination>>(
      `${environment.serverUrl}${this.controllerUrl}/?pageNo=${
        page - 1
      }&pageSize=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    );
  }

  getById(orgId: number) {
    return this.httpClient.get<Examination>(
      `${environment.serverUrl}${this.controllerUrl}/${orgId}`
    );
  }

  insertExamination(examination: Examination) {
    return this.httpClient.post<Examination>(
      `${environment.serverUrl}${this.controllerUrl}`,
      examination
    );
  }

  updateExamination(examination: Examination) {
    return this.httpClient.put<Examination>(
      `${environment.serverUrl}${this.controllerUrl}`,
      examination
    );
  }

  deleteById(id: number) {
    return this.httpClient.delete(
      `${environment.serverUrl}${this.controllerUrl}/${id}`
    );
  }
}
