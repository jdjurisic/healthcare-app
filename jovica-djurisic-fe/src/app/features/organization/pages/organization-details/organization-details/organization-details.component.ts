import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
})
export class OrganizationDetailsComponent implements OnInit {
  organization!: Organization;
  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const orgId = Number(this.route.snapshot.paramMap.get('id'));
    this.organizationService.getById(orgId).subscribe({
      next: (response) => {
        this.organization = response;
      },
      error: (error) => console.log(error),
    });
  }

  backClicked() {
    this._location.back();
  }
}
