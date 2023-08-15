import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationDetailsComponent } from './pages/examination-details/examination-details.component';
import { ExaminationFormComponent } from './pages/examination-form/examination-form.component';
import { ExaminationListComponent } from './pages/examination-list/examination-list.component';
import { ExaminationsListResolver } from './resolvers/examinations-list.resolver';

const routes: Routes = [
  { path: 'list', component: ExaminationListComponent, resolve: {examinationPage: ExaminationsListResolver} },
  { path: 'form/:id', component: ExaminationFormComponent, data: { edit: true} },
  { path: 'form', component: ExaminationFormComponent, data: { edit: false} },
  { path: 'details/:id', component: ExaminationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationRoutingModule {}
