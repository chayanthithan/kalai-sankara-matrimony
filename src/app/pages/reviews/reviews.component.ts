import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-reviews',
  imports: [ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  __firebase: FirebaseService = inject(FirebaseService);

  reviewForm = new FormGroup({
    groomName: new FormControl('', [Validators.required]),
    brideName: new FormControl('', [Validators.required]),
    weddingDate: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),

  });

  addReviews() {
    if (this.reviewForm.valid) {
      const records = this.reviewForm.value;
      this.__firebase.addReviews(records)
        .then((isValid: any) => {
          if (isValid) {
            console.log("successfully added")
            this.reviewForm.reset();
          } else {
            console.log('something wrong to add review');
          }
        })
        .catch((error: any) => {
          console.error('Login error:', error);
        });
    }else{

    }
  }
}
