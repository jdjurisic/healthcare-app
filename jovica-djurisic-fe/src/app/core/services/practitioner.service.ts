import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageDto } from '../models/page.dto';
import { Practitioner } from '../models/practitioner';

@Injectable({
  providedIn: 'root',
})
export class PractitionerService {
  readonly controllerUrl = '/practitioners';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Practitioner[]> {
    return this.httpClient.get<Practitioner[]>(
      `${environment.serverUrl}${this.controllerUrl}`
    );
  }

  getByPage(
    page: number,
    size: number,
    sortBy: string,
    sortOrder: string = 'asc',
    unemployed: number = 0
  ) {
    return this.httpClient.get<PageDto<Practitioner>>(
      `${environment.serverUrl}${this.controllerUrl}/?pageNo=${
        page - 1
      }&pageSize=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&unemployed=${unemployed}`
    );
  }

  getById(orgId: number) {
    return this.httpClient.get<Practitioner>(
      `${environment.serverUrl}${this.controllerUrl}/${orgId}`
    );
  }

  insertPractitioner(practitioner: Practitioner) {
    return this.httpClient.post<Practitioner>(
      `${environment.serverUrl}${this.controllerUrl}`,
      practitioner
    );
  }

  updatePractitioner(practitioner: Practitioner) {
    return this.httpClient.put<Practitioner>(
      `${environment.serverUrl}${this.controllerUrl}`,
      practitioner
    );
  }

  deleteById(id: number) {
    return this.httpClient.delete(
      `${environment.serverUrl}${this.controllerUrl}/${id}`
    );
  }

  getPractitionersForDropdown() {
    return this.httpClient.get<Practitioner[]>(
      `${environment.serverUrl}${this.controllerUrl}/all`
    );
  }

  getPractitionersByQualification(qualification: string) {
    return this.httpClient.get<Practitioner[]>(
      `${environment.serverUrl}${this.controllerUrl}/all/${qualification}`
    );
  }
}
