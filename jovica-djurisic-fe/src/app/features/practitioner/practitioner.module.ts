import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PractitionerRoutingModule } from './practitioner-routing.module';
import { PractitionerDetailsComponent } from './pages/practitioner-details/practitioner-details.component';
import { PractitionerListComponent } from './pages/practitioner-list/practitioner-list.component';
import { PractitionerFormComponent } from './pages/practitioner-form/practitioner-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PractitionerDetailsComponent,
    PractitionerListComponent,
    PractitionerFormComponent,
  ],
  imports: [CommonModule, PractitionerRoutingModule, SharedModule],
})
export class PractitionerModule {}
