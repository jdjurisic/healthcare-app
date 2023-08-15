import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  readonly controllerUrl = '/dashboard';
  constructor(private httpClient: HttpClient) {}

  getDashboardData(): Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(
      `${environment.serverUrl}${this.controllerUrl}`
    );
  }
}

export interface DashboardData {
  Practitioners: any[][];
  Examinations: any[][];
  Qualifications: any[][];
}
