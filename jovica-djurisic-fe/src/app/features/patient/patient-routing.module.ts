import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientsListResolver } from './resolvers/patients-list.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: PatientListComponent,
    resolve: { patientPage: PatientsListResolver },
  },
  { path: 'form/:id', component: PatientFormComponent, data: { edit: true } },
  { path: 'form', component: PatientFormComponent, data: { edit: false } },
  { path: 'details/:id', component: PatientDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
