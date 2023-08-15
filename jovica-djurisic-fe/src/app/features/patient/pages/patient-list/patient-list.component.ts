import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDto } from 'src/app/core/models/page.dto';
import { Patient } from 'src/app/core/models/patient';
import { PatientService } from 'src/app/core/services/patient.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patients?: Patient[];
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
    private patientService: PatientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const orgPage: PageDto<Patient> =
      this.activatedRoute.snapshot.data['patientPage'];
    this.patients = orgPage.content;
    this.currentPage = orgPage.number + 1;
    this.totalItems = orgPage.totalElements;
    this.pageSize = orgPage.size;

    // only name, lastname, identifier, qualification and organization remain
    this.availableFields = Object.keys(this.patients[0])
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

  loadPatients() {
    this.loadingData = true;
    this.patientService
      .getByPage(this.currentPage, this.pageSize, this.sortBy, this.sortOrder)
      .subscribe((patPage) => {
        this.patients = patPage.content;
        this.totalItems = patPage.totalElements;
        this.pageSize = patPage.size;
        this.loadingData = false;
      });
  }

  onPageChange(page: number) {
    this.loadPatients();
  }

  onPageSizeChange() {
    this.loadPatients();
  }

  onSortChange() {
    this.loadPatients();
  }

  deletePatient(examinationId: number){
    this.patientService.deleteById(examinationId).subscribe({
      next: (response) =>{
        console.log(response);
        this.toastService.showToast('Patient deleted.', {
          header: 'Operation performed.',
          className: 'bg-success text-light',
        });
        this.loadPatients();
      },
      error: (error) => {
        this.toastService.showToast('Patient has running examination.', {
          header: 'Operation delete error.',
          className: 'bg-warning text-light',
        });
      }
    })
  }
}
