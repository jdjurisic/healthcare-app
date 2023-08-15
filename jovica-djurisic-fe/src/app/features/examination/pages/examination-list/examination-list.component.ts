import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Examination } from 'src/app/core/models/examination';
import { PageDto } from 'src/app/core/models/page.dto';
import { ExaminationService } from 'src/app/core/services/examination.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.css'],
})
export class ExaminationListComponent implements OnInit {
  examinations?: Examination[];
  currentPage = 1;
  totalItems = 10;
  pageSize = 5;
  sortBy = '';
  sortOrder = 'asc';
  loadingData = false;

  availablePageSize = [2, 5, 10, 15, 20];
  availableFields: string[] = [];
  availableOrders = ['asc', 'desc'];

  constructor(
    private examinationService: ExaminationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const orgPage: PageDto<Examination> =
      this.activatedRoute.snapshot.data['examinationPage'];
    this.examinations = orgPage.content;
    this.currentPage = orgPage.number + 1;
    this.totalItems = orgPage.totalElements;
    this.pageSize = orgPage.size;

    // only name, lastname, identifier, qualification and organization remain
    this.availableFields = Object.keys(this.examinations[0]);
      // .filter((word) => word != 'id')
      // .filter((word) => word != 'active')
      // .filter((word) => word != 'email')
      // .filter((word) => word != 'address')
      // .filter((word) => word != 'phone')
      // .filter((word) => word != 'gender')
      // .filter((word) => word != 'birthDate')
      // .filter((word) => word != 'active');
    this.sortBy = this.availableFields[0];
  }

  loadExaminations() {
    this.loadingData = true;
    this.examinationService
      .getByPage(this.currentPage, this.pageSize, this.sortBy, this.sortOrder)
      .subscribe((examPage) => {
        this.examinations = examPage.content;
        this.totalItems = examPage.totalElements;
        this.pageSize = examPage.size;
        this.loadingData = false;
      });
  }

  onPageChange(page: number) {
    this.loadExaminations();
  }

  onPageSizeChange() {
    this.loadExaminations();
  }

  onSortChange() {
    this.loadExaminations();
  }

  deleteExamination(examinationId: number){
    this.examinationService.deleteById(examinationId).subscribe({
      next: (response) =>{
        console.log(response);
        this.toastService.showToast('Examination deleted successfully', {
          header: 'Deleting examination',
          className: 'bg-success text-light',
        });
        this.loadExaminations();
      },
      error: (error) =>  this.toastService.showToast('Examinations cant be deleted.', {
          header: 'Deleting examination failed',
          className: 'bg-warning text-warning',
        })
    })
  }
}