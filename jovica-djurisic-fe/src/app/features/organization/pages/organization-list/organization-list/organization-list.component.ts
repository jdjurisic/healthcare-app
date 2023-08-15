import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Subject,
} from 'rxjs';
import { Organization } from 'src/app/core/models/organization';
import { PageDto } from 'src/app/core/models/page.dto';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css'],
})
export class OrganizationListComponent implements OnInit {
  organizations?: Organization[];
  currentPage = 1;
  totalItems = 10;
  pageSize = 5;
  sortBy = '';
  sortOrder = 'asc';
  loadingData = false;

  nameFilter = '';
  nameFilterChanged: Subject<string> = new Subject<string>();

  availablePageSize = [2, 5, 10, 15, 20];
  availableFields: string[] = [];
  availableOrders = ['asc', 'desc'];

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.nameFilterChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((model) => {
        this.nameFilter = model;
        this.loadOrganizations();
      });
  }

  ngOnInit(): void {
    const orgPage: PageDto<Organization> =
      this.activatedRoute.snapshot.data['organizationPage'];
    this.organizations = orgPage.content;
    this.currentPage = orgPage.number + 1;
    this.totalItems = orgPage.totalElements;
    this.pageSize = orgPage.size;

    // leave only name, type and identifier as filter options
    this.availableFields = Object.keys(this.organizations[0]);
    // .filter((word) => word != 'id')
    // .filter((word) => word != 'active')
    // .filter((word) => word != 'email')
    // .filter((word) => word != 'address')
    // .filter((word) => word != 'phone');
    this.sortBy = this.availableFields[0];
  }

  loadOrganizations() {
    this.loadingData = true;
    this.organizationService
      .getByPage(this.currentPage, this.pageSize, this.sortBy, this.sortOrder, this.nameFilter)
      .subscribe((orgPage) => {
        this.organizations = orgPage.content;
        this.totalItems = orgPage.totalElements;
        this.pageSize = orgPage.size;
        this.loadingData = false;
      });
  }

  onPageChange(page: number) {
    this.loadOrganizations();
  }

  onPageSizeChange() {
    this.loadOrganizations();
  }

  onSortChange() {
    this.loadOrganizations();
  }

  deleteOrganization(organizationId: number) {
    this.organizationService.deleteById(organizationId).subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.showToast('Organization deleted successfully', {
          header: 'Deleting organization',
          className: 'bg-success text-light',
        });
        this.loadOrganizations();
      },
      error: (error) => {
        this.toastService.showToast('Organization has active Examinations', {
          header: 'Deleting organization failed',
          className: 'bg-warning text-light',
        });
      },
    });
  }

  changed(text: string) {
    this.nameFilterChanged.next(text);
  }
}
