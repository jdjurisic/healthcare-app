import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Examination } from 'src/app/core/models/examination';
import { ExaminationService } from 'src/app/core/services/examination.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-examination-details',
  templateUrl: './examination-details.component.html',
  styleUrls: ['./examination-details.component.css'],
})
export class ExaminationDetailsComponent implements OnInit {
  examination!: Examination;
  constructor(
    private route: ActivatedRoute,
    private examinationService: ExaminationService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const orgId = Number(this.route.snapshot.paramMap.get('id'));
    this.examinationService.getById(orgId).subscribe({
      next: (response) => {
        this.examination = response;
      },
      error: (error) => console.log(error),
    });
  }

  backClicked() {
    this._location.back();
  }
}
