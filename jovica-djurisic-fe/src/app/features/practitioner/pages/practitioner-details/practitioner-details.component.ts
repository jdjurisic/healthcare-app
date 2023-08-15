import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Practitioner } from 'src/app/core/models/practitioner';
import { PractitionerService } from 'src/app/core/services/practitioner.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-practitioner-details',
  templateUrl: './practitioner-details.component.html',
  styleUrls: ['./practitioner-details.component.css'],
})
export class PractitionerDetailsComponent implements OnInit {
  practitioner!: Practitioner;

  constructor(
    private route: ActivatedRoute,
    private practitionerService: PractitionerService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const practId = Number(this.route.snapshot.paramMap.get('id'));
    this.practitionerService.getById(practId).subscribe({
      next: (response) => {
        this.practitioner = response;
      },
      error: (error) => console.log(error),
    });
  }

  backClicked() {
    this._location.back();
  }
}
