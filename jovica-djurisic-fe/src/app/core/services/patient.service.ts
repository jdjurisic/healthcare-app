import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageDto } from '../models/page.dto';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  readonly controllerUrl = '/patients';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(
      `${environment.serverUrl}${this.controllerUrl}`
    );
  }

  getByPage(
    page: number,
    size: number,
    sortBy: string,
    sortOrder: string = 'asc'
  ) {
    return this.httpClient.get<PageDto<Patient>>(
      `${environment.serverUrl}${this.controllerUrl}/?pageNo=${
        page - 1
      }&pageSize=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    );
  }

  getById(orgId: number) {
    return this.httpClient.get<Patient>(
      `${environment.serverUrl}${this.controllerUrl}/${orgId}`
    );
  }

  insertPractitioner(patient: Patient) {
    return this.httpClient.post<Patient>(
      `${environment.serverUrl}${this.controllerUrl}`,
      patient
    );
  }

  updatePractitioner(patient: Patient) {
    return this.httpClient.put<Patient>(
      `${environment.serverUrl}${this.controllerUrl}`,
      patient
    );
  }

  deleteById(id: number) {
    return this.httpClient.delete(
      `${environment.serverUrl}${this.controllerUrl}/${id}`
    );
  }

  getPatientsForDropdown() {
    return this.httpClient.get<Patient[]>(
      `${environment.serverUrl}${this.controllerUrl}/all`
    );
  }
}
