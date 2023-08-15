import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ORGANIZATION_TYPE } from 'src/app/core/models/back-end-enums';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css'],
})
export class OrganizationFormComponent implements OnInit {
  organizationForm?: FormGroup;
  edit = false;

  organizationTypes = ORGANIZATION_TYPE;

  destroy$: Subject<boolean> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.prepareData();
  }

  prepareData() {
    this.edit = this.route.snapshot.data['edit'];
    const orgId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.edit && orgId) {
      this.loadOrganization(orgId);
    } else {
      this.buildForm();
    }
  }

  loadOrganization(orgId: number) {
    this.organizationService
      .getById(orgId)
      .subscribe((response) => this.buildForm(response));
  }

  buildForm(organization?: Organization) {
    this.organizationForm = this.formBuilder.group({
      id: [organization ? organization.id : null],
      name: [organization ? organization.name : null, [Validators.required]],
      type: [organization ? organization.type : null, [Validators.required]],
      email: [
        organization ? organization.email : null,
        [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      address: [organization ? organization.address : null],
      phone: [organization ? organization.phone : null],
      identifier: [
        organization ? organization.identifier : null,
        [Validators.minLength(5)],
      ],
      active: [Boolean(true)],
    });
  }

  onSubmit() {
    this.saveCity()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);
          if (this.edit)
            this.toastService.showToast('Organization edited successfully', {
              header: 'Editing organization',
              className: 'bg-success text-light',
            });
          else
            this.toastService.showToast('Organization saved successfully', {
              header: 'Saving organization',
              className: 'bg-success text-light',
            });
          this.router.navigate(['/organization/list']);
        },
        error: (error) => {
          console.log('error:', error);
          if (this.edit)
            this.toastService.showToast('Organization edit failed.', {
              header: 'Operation error.',
              className: 'bg-warning text-light',
            });
          else
            this.toastService.showToast('Organization is not saved.', {
              header: 'Operation error.',
              className: 'bg-warning text-light',
            });
        },
      });
  }

  saveCity() {
    if (this.edit) {
      return this.organizationService.updateOrganization(
        this.organizationForm?.value
      );
    } else {
      return this.organizationService.insertOrganization(
        this.organizationForm?.value
      );
    }
  }

  hasErrors(componentName: string, errorCode?: string) {
    return (
      (this.organizationForm?.get(componentName)?.dirty ||
        this.organizationForm?.get(componentName)?.touched) &&
      ((!errorCode && this.organizationForm?.get(componentName)?.errors) ||
        (errorCode &&
          this.organizationForm?.get(componentName)?.hasError(errorCode)))
    );
  }
}
