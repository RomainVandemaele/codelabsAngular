import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {HousingLocationComponent} from "../housing-location/housing-location.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService: HousingService = inject(HousingService);
  housingLocationId: number = -1;
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.housingService
        .getHousingLocationById(this.housingLocationId)
        .then(
            housingLocation => this.housingLocation = housingLocation
        );
  }

  submitApplication() {
    this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName  ?? '',
        this.applyForm.value.email        ?? '',
    );

  }

}
