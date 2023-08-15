import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PractitionerDetailsComponent } from './pages/practitioner-details/practitioner-details.component';
import { PractitionerFormComponent } from './pages/practitioner-form/practitioner-form.component';
import { PractitionerListComponent } from './pages/practitioner-list/practitioner-list.component';
import { PractitionersListResolver } from './resolvers/practitioners-list.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: PractitionerListComponent,
    resolve: { practitionerPage: PractitionersListResolver },
  },
  {
    path: 'form/:id',
    component: PractitionerFormComponent,
    data: { edit: true },
  },
  { path: 'form', component: PractitionerFormComponent, data: { edit: false } },
  { path: 'details/:id', component: PractitionerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PractitionerRoutingModule {}
