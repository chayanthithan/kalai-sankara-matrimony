import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { FirebaseService } from '../../../services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addpost',
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }


  __firebase: FirebaseService = inject(FirebaseService);

  postId: string | null = null;
  isEditMode = false;


  postData: any;

  ngOnInit(): void {
    debugger
    // Get the post ID from route parameters
    this.postId = this.route.snapshot.paramMap.get('id');

    // Check if we're in edit mode (ID exists)
    this.isEditMode = !!this.postId;

    // Get the post data from router state
    this.postData = history.state.postData;
    if(this.isEditMode){
      this.groomAndBrideDetails.patchValue({
        age:this.postData.age,
        caste:this.postData.caste,
        color:this.postData.color,
        dob:this.postData.dob,
        education:this.postData.education,
        expectation:this.postData.expectation,
        fatherBirthPlace:this.postData.fatherBirthPlace,
        fatherName:this.postData.fatherName,
        fname:this.postData.fname,
        height:this.postData.height,
        lname:this.postData.lname,
        motherBirthPlace:this.postData.motherBirthPlace,
        motherName:this.postData.motherName,
        nakshatra:this.postData.nakshatra,
        occupation:this.postData.occupation,
        siblingBoys:this.postData.siblingBoys,
        siblingGirls:this.postData.siblingGirls,
        willingCaste:this.postData.willingCaste,
        zodiacSign:this.postData.zodiacSign,
        time:this.postData.time,
        category:this.postData.category,
        });
    }

    

  }
  groomAndBrideDetails = new FormGroup({
    age: new FormControl(0, [Validators.required]),
    caste: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    dob: new FormControl(new Date(), [Validators.required]),
    education: new FormControl('', [Validators.required]),
    expectation: new FormControl('', [Validators.required]),
    fatherBirthPlace: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    fname: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    motherBirthPlace: new FormControl('', [Validators.required]),
    motherName: new FormControl('', [Validators.required]),
    nakshatra: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    siblingBoys: new FormControl(0, [Validators.required]),
    siblingGirls: new FormControl(0, [Validators.required]),
    willingCaste: new FormControl('', [Validators.required]),
    zodiacSign: new FormControl('', [Validators.required]),
    time: new FormControl([Validators.required]),
    category: new FormControl([Validators.required])
  });


  addPost() {
    debugger
    // add post
    if (this.postId == null) {
      if (this.groomAndBrideDetails.valid) {
        const matrimonyDetails = this.groomAndBrideDetails.value;

        this.__firebase.addMatrimonyDetailsPost(matrimonyDetails)
          .then((isValid: any) => {
              console.log("successfully added")
              this.resetFormAndNavigate();
          })
          .catch((error: any) => {
            console.error('Login error:', error);
          });

      } else {

      }

      // update post
    } else {
      this.__firebase.updateMatrimonyDetailsPost(this.postId,this.groomAndBrideDetails.value)
          .then((isValid: any) => {
              console.log("successfully Updated")
              this.resetFormAndNavigate();
          })
          .catch((error: any) => {
            console.error('Login error:', error);
          });
    }

  }

  onCancel() {
    this.router.navigate(['/admin/dashboard']);
  }
 resetFormAndNavigate() {
  
  // Clear any edit state
  this.postId = null;
  
  // Navigate to dashboard
  this.router.navigate(['/admin/dashboard']);
}
}
