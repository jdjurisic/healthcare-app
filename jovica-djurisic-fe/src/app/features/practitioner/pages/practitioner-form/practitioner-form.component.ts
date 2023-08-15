import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  GENDER,
  PRACTITIONER_QUALIFICATION,
} from 'src/app/core/models/back-end-enums';
import { Organization } from 'src/app/core/models/organization';
import { Practitioner } from 'src/app/core/models/practitioner';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { PractitionerService } from 'src/app/core/services/practitioner.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-practitioner-form',
  templateUrl: './practitioner-form.component.html',
  styleUrls: ['./practitioner-form.component.css'],
})
export class PractitionerFormComponent implements OnInit {
  practitionerForm?: FormGroup;
  edit = false;

  destroy$: Subject<boolean> = new Subject();

  organizations: Organization[] = [];

  qualifications = PRACTITIONER_QUALIFICATION;
  genders = GENDER;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.organizationService
      .getOrganizationsForDropdown()
      .subscribe((response) => (this.organizations = response));
    this.prepareData();
  }

  prepareData() {
    this.edit = this.route.snapshot.data['edit'];
    const orgId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.edit && orgId) {
      this.loadPractitioner(orgId);
    } else {
      this.buildForm();
    }
  }

  loadPractitioner(orgId: number) {
    this.practitionerService
      .getById(orgId)
      .subscribe((response) => this.buildForm(response));
  }

  buildForm(practitioner?: Practitioner) {
    this.practitionerForm = this.formBuilder.group({
      id: [practitioner ? practitioner.id : null],
      name: [
        practitioner ? practitioner.name : null,
        [Validators.required, Validators.minLength(3)],
      ],
      surname: [
        practitioner ? practitioner.surname : null,
        [Validators.required, Validators.minLength(3)],
      ],
      gender: [
        practitioner ? practitioner.gender : null,
        [Validators.required],
      ],
      qualification: [
        practitioner ? practitioner.qualification : null,
        [Validators.required],
      ],
      birthDate: [
        practitioner ? practitioner.birthDate : null,
        [Validators.required],
      ],
      email: [
        practitioner ? practitioner.email : null,
        [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      address: [practitioner ? practitioner.address : null],
      phone: [practitioner ? practitioner.phone : null],
      identifier: [
        practitioner ? practitioner.identifier : null,
        [Validators.minLength(5)],
      ],
      active: [Boolean(true)],
      organization: [practitioner ? practitioner.organization : null],
    });
  }

  onSubmit() {
    this.savePractitioner()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);
          if (this.edit)
            this.toastService.showToast('Practitioner edit failed.', {
              header: 'Operation error.',
              className: 'bg-warning text-light',
            });
          this.toastService.showToast('Practitioner is not saved.', {
            header: 'Operation error.',
            className: 'bg-warning text-light',
          });
          this.router.navigate(['/practitioner/list']);
        },
        error: (error) => {
          if (this.edit)
            this.toastService.showToast('Practitioner edit failed.', {
              header: 'Operation error.',
              className: 'bg-warning text-light',
            });
          this.toastService.showToast('Practitioner is not saved.', {
            header: 'Operation error.',
            className: 'bg-warning text-light',
          });
        },
      });
    // console.log(this.practitionerForm?.value);
  }

  savePractitioner() {
    if (this.edit) {
      return this.practitionerService.updatePractitioner(
        this.practitionerForm?.value
      );
    } else {
      return this.practitionerService.insertPractitioner(
        this.practitionerForm?.value
      );
    }
  }

  hasErrors(componentName: string, errorCode?: string) {
    return (
      (this.practitionerForm?.get(componentName)?.dirty ||
        this.practitionerForm?.get(componentName)?.touched) &&
      ((!errorCode && this.practitionerForm?.get(componentName)?.errors) ||
        (errorCode &&
          this.practitionerForm?.get(componentName)?.hasError(errorCode)))
    );
  }

  compareObj(val1: Organization, val2: Organization) {
    if (val1 && val2) {
      return val1.id === val2.id;
    }
    return false;
  }
}
