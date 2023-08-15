import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/core/models/organization';
import { Patient } from 'src/app/core/models/patient';
import { Practitioner } from 'src/app/core/models/practitioner';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PractitionerService } from 'src/app/core/services/practitioner.service';
import {
  GENDER,
  MARITAL_STATUS,
  PRACTITIONER_QUALIFICATION,
} from 'src/app/core/models/back-end-enums';
import { ToastService } from 'src/app/core/services/toast.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  patientForm?: FormGroup;
  edit = false;

  organizations: Organization[] = [];
  practitioners: Practitioner[] = [];

  qualifications = PRACTITIONER_QUALIFICATION;
  genders = GENDER;
  maritalStatus = MARITAL_STATUS;

  destroy$: Subject<boolean> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    private patientService: PatientService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.organizationService
      .getOrganizationsForDropdown()
      .subscribe((response) => (this.organizations = response));
    this.practitionerService
      .getPractitionersByQualification('DOCTOR_OF_MEDICINE')
      .subscribe((response) => (this.practitioners = response));
    this.prepareData();
  }

  prepareData() {
    this.edit = this.route.snapshot.data['edit'];
    const orgId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.edit && orgId) {
      this.loadPatient(orgId);
    } else {
      this.buildForm();
    }
  }

  loadPatient(orgId: number) {
    this.patientService
      .getById(orgId)
      .subscribe((response) => this.buildForm(response));
  }

  buildForm(patient?: Patient) {
    this.patientForm = this.formBuilder.group({
      id: [patient ? patient.id : null],
      name: [
        patient ? patient.name : null,
        [Validators.required, Validators.minLength(3)],
      ],
      surname: [
        patient ? patient.surname : null,
        [Validators.required, Validators.minLength(3)],
      ],
      gender: [patient ? patient.gender : null, [Validators.required]],
      birthDate: [patient ? patient.birthDate : null, [Validators.required]],
      email: [
        patient ? patient.email : null,
        [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      address: [patient ? patient.address : null],
      phone: [patient ? patient.phone : null],
      identifier: [
        patient ? patient.identifier : null,
        [Validators.minLength(5)],
      ],
      active: [Boolean(true)],
      organization: [patient ? patient.organization : null],
      deceased: [patient ? patient.deceased : null],
      maritalStatus: [
        patient ? patient.maritalStatus : null,
        [Validators.required],
      ],
      primaryCareProvider: [patient ? patient.primaryCareProvider : null],
    });
  }

  onSubmit() {
    this.savePatient().subscribe({
      next: (response) => {
        console.log(response);
        if (this.edit)
          this.toastService.showToast('Patient edited successfully', {
            header: 'Editing Patient',
            className: 'bg-success text-light',
          });
        else
          this.toastService.showToast('Patient saved successfully', {
            header: 'Saving Patient',
            className: 'bg-success text-light',
          });
        this.router.navigate(['/patient/list']);
      },
      error: (error) => {
        if (this.edit)
          this.toastService.showToast('Patient edit failed.', {
            header: 'Operation error.',
            className: 'bg-warning text-light',
          });
        else
          this.toastService.showToast('Patient is not saved.', {
            header: 'Operation error.',
            className: 'bg-warning text-light',
          });
      },
    });
    //console.log(this.patientForm?.value);
  }

  savePatient() {
    if (this.edit) {
      return this.patientService.updatePractitioner(this.patientForm?.value);
    } else {
      return this.patientService.insertPractitioner(this.patientForm?.value);
    }
  }

  hasErrors(componentName: string, errorCode?: string) {
    return (
      (this.patientForm?.get(componentName)?.dirty ||
        this.patientForm?.get(componentName)?.touched) &&
      ((!errorCode && this.patientForm?.get(componentName)?.errors) ||
        (errorCode &&
          this.patientForm?.get(componentName)?.hasError(errorCode)))
    );
  }

  compareObj(
    val1: Organization | Practitioner,
    val2: Organization | Practitioner
  ) {
    if (val1 && val2) {
      return val1.id === val2.id;
    }
    return false;
  }
}
