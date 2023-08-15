import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceType } from '../models/service-type';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypeService {
  readonly controllerUrl = '/service_types';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ServiceType[]> {
    return this.httpClient.get<ServiceType[]>(
      `${environment.serverUrl}${this.controllerUrl}`
    );
  }
}
