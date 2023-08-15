import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Examination } from 'src/app/core/models/examination';
import { Organization } from 'src/app/core/models/organization';
import { Patient } from 'src/app/core/models/patient';
import { Practitioner } from 'src/app/core/models/practitioner';
import { ServiceType } from 'src/app/core/models/service-type';
import { ExaminationService } from 'src/app/core/services/examination.service';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PractitionerService } from 'src/app/core/services/practitioner.service';
import { ServiceTypeService } from 'src/app/core/services/service-type.service';

import {
  EXAMINATION_PRIORITY,
  EXAMINATION_STATUS,
  SERVICE_TYPE,
} from 'src/app/core/models/back-end-enums';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-examination-form',
  templateUrl: './examination-form.component.html',
  styleUrls: ['./examination-form.component.css'],
})
export class ExaminationFormComponent implements OnInit {
  examinationForm?: FormGroup;
  edit = false;

  organizations: Organization[] = [];
  practitioners: Practitioner[] = [];
  patients: Patient[] = [];

  statuses = EXAMINATION_STATUS;
  priorities = EXAMINATION_PRIORITY;
  serviceTypes = SERVICE_TYPE;
  // serviceTypes : ServiceType[] = [];

  destroy$: Subject<boolean> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    private patientService: PatientService,
    private examinationService: ExaminationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.organizationService
      .getOrganizationsForDropdown()
      .subscribe((response) => (this.organizations = response));
    this.practitionerService
      .getPractitionersByQualification('DOCTOR_OF_MEDICINE')
      .subscribe((response) => (this.practitioners = response));
    this.patientService
      .getPatientsForDropdown()
      .subscribe((response) => (this.patients = response));
    // this.serviceTypeService
    //   .getAll()
    //   .subscribe((response) => (this.serviceTypes = response));
    this.prepareData();
  }

  prepareData() {
    this.edit = this.route.snapshot.data['edit'];
    const examId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.edit && examId) {
      this.loadExamination(examId);
    } else {
      this.buildForm();
    }
  }

  loadExamination(examId: number) {
    this.examinationService
      .getById(examId)
      .subscribe((response) => this.buildForm(response));
  }

  buildForm(examination?: Examination) {
    this.examinationForm = this.formBuilder.group({
      id: [examination ? examination.id : null],
      startDate: [
        examination ? this.timeSlicer(examination.startDate) : null,
        [Validators.required],
      ],
      endDate: [
        examination ? this.timeSlicer(examination.endDate) : null,
        [Validators.required],
      ],
      identifier: [
        examination ? examination.identifier : null,
        [Validators.minLength(5)],
      ],
      organization: [
        examination ? examination.organization : null,
        [Validators.required],
      ],
      practitioners: [
        examination ? examination.practitioners : null,
        [Validators.required],
      ],
      patient: [
        examination ? examination.patient : null,
        [Validators.required],
      ],
      diagnosis: [examination ? examination.diagnosis : null],
      status: [examination ? examination.status : null, [Validators.required]],
      priority: [
        examination ? examination.priority : null,
        [Validators.required],
      ],
      serviceType: [
        examination ? examination.serviceType : null,
        [Validators.required],
      ],
    });
  }

  onSubmit() {
    this.saveExamination().subscribe({
      next: (response) => {
        console.log(response);
        if (this.edit)
          this.toastService.showToast('Examination edited successfully', {
            header: 'Editing examination',
            className: 'bg-success text-light',
          });
        else
          this.toastService.showToast('Examination saved successfully', {
            header: 'Saving examination',
            className: 'bg-success text-light',
          });
        this.router.navigate(['/examination/list']);
      },
      error: (error) => {
        if (this.edit)
          this.toastService.showToast('Examination edit failed.', {
            header: 'Operation error.',
            className: 'bg-warning text-light',
          });
        else
          this.toastService.showToast('Examination is not saved.', {
            header: 'Operation error.',
            className: 'bg-warning text-light',
          });
      },
    });
  }

  saveExamination() {
    if (this.edit) {
      return this.examinationService.updateExamination(
        this.examinationForm?.value
      );
    } else {
      return this.examinationService.insertExamination(
        this.examinationForm?.value
      );
    }
  }

  hasErrors(componentName: string, errorCode?: string) {
    return (
      (this.examinationForm?.get(componentName)?.dirty ||
        this.examinationForm?.get(componentName)?.touched) &&
      ((!errorCode && this.examinationForm?.get(componentName)?.errors) ||
        (errorCode &&
          this.examinationForm?.get(componentName)?.hasError(errorCode)))
    );
  }

  compareObj(
    val1: Organization | Practitioner | Patient,
    val2: Organization | Practitioner | Patient
  ) {
    if (val1 && val2) {
      return val1.id === val2.id;
    }
    return false;
  }

  /*
   function that returns correct format for datetime-local input
   backend returns => 2022-06-04T23:00:00.000+00:00
   component needs => 2022-06-04T23:00:00.000
   */

  timeSlicer(time: string): string {
    return time.slice(0, time.indexOf('+'));
  }
}
