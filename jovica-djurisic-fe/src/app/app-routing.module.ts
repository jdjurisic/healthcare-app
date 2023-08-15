import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('./features/organization/organization.module').then(
        (m) => m.OrganizationModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'practitioner',
    loadChildren: () =>
      import('./features/practitioner/practitioner.module').then(
        (m) => m.PractitionerModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'patient',
    loadChildren: () =>
      import('./features/patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'examination',
    loadChildren: () =>
      import('./features/examination/examination.module').then(
        (m) => m.ExaminationModule
      ),
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
