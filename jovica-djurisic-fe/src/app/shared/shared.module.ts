import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NgbNavModule, NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintFormatterPipe } from './pipes/print-formatter.pipe';
import { GlobalToastComponent } from './components/global-toast/global-toast.component';

@NgModule({
  declarations: [HeaderComponent, PrintFormatterPipe, GlobalToastComponent],
  imports: [
    CommonModule,
    NgbNavModule,
    RouterModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule
  ],
  exports: [
    HeaderComponent,
    NgbNavModule,
    RouterModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    PrintFormatterPipe,
    NgbToastModule,
    GlobalToastComponent
  ],
})
export class SharedModule {}
