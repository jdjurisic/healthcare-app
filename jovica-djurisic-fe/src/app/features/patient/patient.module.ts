import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PatientDetailsComponent,
    PatientFormComponent,
    PatientListComponent,
  ],
  imports: [CommonModule, PatientRoutingModule, SharedModule],
})
export class PatientModule {}
