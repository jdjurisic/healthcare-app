import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/core/models/patient';
import { PatientService } from 'src/app/core/services/patient.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  patient!: Patient;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const practId = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getById(practId).subscribe({
      next: (response) => {
        this.patient = response;
      },
      error: (error) => console.log(error),
    });
  }

  backClicked() {
    this._location.back();
  }
}
