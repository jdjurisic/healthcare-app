import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDto } from 'src/app/core/models/page.dto';
import { Practitioner } from 'src/app/core/models/practitioner';
import { PractitionerService } from 'src/app/core/services/practitioner.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-practitioner-list',
  templateUrl: './practitioner-list.component.html',
  styleUrls: ['./practitioner-list.component.css'],
})
export class PractitionerListComponent implements OnInit {
  practitioners?: Practitioner[];
  currentPage = 1;
  totalItems = 10;
  pageSize = 5;
  sortBy = '';
  sortOrder = 'asc';
  loadingData = false;
  unemployedFlag = 0;

  availablePageSize = [2, 5, 10, 15, 20];
  availableFields: string[] = [];
  availableOrders = ['asc', 'desc'];



  constructor(
    private practitionerService: PractitionerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const orgPage: PageDto<Practitioner> =
      this.activatedRoute.snapshot.data['practitionerPage'];
    this.practitioners = orgPage.content;
    this.currentPage = orgPage.number + 1;
    this.totalItems = orgPage.totalElements;
    this.pageSize = orgPage.size;

    // only name, lastname, identifier, qualification and organization remain
    this.availableFields = Object.keys(this.practitioners[0])
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

  loadPractitioners() {
    this.loadingData = true;
    this.practitionerService
      .getByPage(this.currentPage, this.pageSize, this.sortBy, this.sortOrder,this.unemployedFlag)
      .subscribe((practPage) => {
        this.practitioners = practPage.content;
        this.totalItems = practPage.totalElements;
        this.pageSize = practPage.size;
        this.loadingData = false;
      });
  }

  onPageChange(page: number) {
    this.loadPractitioners();
  }

  onPageSizeChange() {
    this.loadPractitioners();
  }

  onSortChange() {
    this.loadPractitioners();
  }

  deletePractitioner(practitionerId: number){
    this.practitionerService.deleteById(practitionerId).subscribe({
      next: (response) =>{
        console.log(response);
        this.toastService.showToast('Practitioner deleted.', {header:'Operation performed.', className: 'bg-warning text-light'});
        this.loadPractitioners();
      },
      error: (error) => this.toastService.showToast('Practitioner delete failed.Practitioner has running examinations.', {header:'Operation error.', className: 'bg-warning text-light'})
    })
  }

  unemployedFilter(){
    this.unemployedFlag = this.unemployedFlag?0:1;
    this.loadPractitioners();
  }
}
