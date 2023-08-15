import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationDetailsComponent } from './pages/organization-details/organization-details/organization-details.component';
import { OrganizationFormComponent } from './pages/organization-form/organization-form/organization-form.component';
import { OrganizationListComponent } from './pages/organization-list/organization-list/organization-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    OrganizationDetailsComponent,
    OrganizationFormComponent,
    OrganizationListComponent,
  ],
  imports: [CommonModule, OrganizationRoutingModule, SharedModule],
})
export class OrganizationModule {}
