import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationDetailsComponent } from './pages/organization-details/organization-details/organization-details.component';
import { OrganizationFormComponent } from './pages/organization-form/organization-form/organization-form.component';
import { OrganizationListComponent } from './pages/organization-list/organization-list/organization-list.component';
import { OrganizationsListResolver } from './resolvers/organizations-list.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: OrganizationListComponent,
    resolve: { organizationPage: OrganizationsListResolver },
  },
  {
    path: 'form/:id',
    component: OrganizationFormComponent,
    data: { edit: true },
  },
  { path: 'form', component: OrganizationFormComponent, data: { edit: false } },
  { path: 'details/:id', component: OrganizationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
