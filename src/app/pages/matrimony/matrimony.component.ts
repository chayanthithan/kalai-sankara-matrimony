import { Component } from '@angular/core';
import { GroomAndBrideDetails } from '../../model/GroomAndBrideDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matrimony',
  imports: [],
  templateUrl: './matrimony.component.html',
  styleUrl: './matrimony.component.css',
})
export class MatrimonyComponent {
  profile: any;
  matrimonyData: GroomAndBrideDetails;

  constructor(private router: Router) {
    // Retrieve state data
    this.matrimonyData = this.router.getCurrentNavigation()?.extras.state?.['matrimonyData'];
    console.log("matrimony:",this.matrimonyData);
    // Fallback for direct URL access
    if (!this.matrimonyData) {
      this.router.navigate(['/']); // Redirect if no data
    }
  }
}
