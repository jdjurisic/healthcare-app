import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../models/organization';
import { PageDto } from '../models/page.dto';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  readonly controllerUrl = '/organizations';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(
      `${environment.serverUrl}${this.controllerUrl}`
    );
  }

  getByPage(
    page: number,
    size: number,
    sortBy: string,
    sortOrder: string = 'asc',
    nameFilter?: string
  ) {
    if (!nameFilter)
      return this.httpClient.get<PageDto<Organization>>(
        `${environment.serverUrl}${this.controllerUrl}/?pageNo=${
          page - 1
        }&pageSize=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
    else
      return this.httpClient.get<PageDto<Organization>>(
        `${environment.serverUrl}${this.controllerUrl}/?pageNo=${
          page - 1
        }&pageSize=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&nameFilter=${nameFilter}`
      );
  }

  getById(orgId: number) {
    return this.httpClient.get<Organization>(
      `${environment.serverUrl}${this.controllerUrl}/${orgId}`
    );
  }

  insertOrganization(organization: Organization) {
    return this.httpClient.post<Organization>(
      `${environment.serverUrl}${this.controllerUrl}`,
      organization
    );
  }

  updateOrganization(organization: Organization) {
    return this.httpClient.put<Organization>(
      `${environment.serverUrl}${this.controllerUrl}`,
      organization
    );
  }

  deleteById(id: number) {
    return this.httpClient.delete(
      `${environment.serverUrl}${this.controllerUrl}/${id}`
    );
  }

  getOrganizationsForDropdown() {
    return this.httpClient.get<Organization[]>(
      `${environment.serverUrl}${this.controllerUrl}/all`
    );
  }
}
