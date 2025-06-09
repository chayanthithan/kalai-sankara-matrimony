import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-addpost',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent implements OnInit{

  __firebase:FirebaseService = inject(FirebaseService);
  ngOnInit(): void {
    console.log("hi add post component");
  }
  groomAndBrideDetails = new FormGroup({
    age:new FormControl(0, [Validators.required]),
    caste:new FormControl('', [Validators.required]),
    color:new FormControl('', [Validators.required]),
    dob:new FormControl(new Date(), [Validators.required]),
    education:new FormControl('', [Validators.required]),
    expectation:new FormControl('', [Validators.required]),
    fatherBirthPlace:new FormControl('', [Validators.required]),
    fatherName:new FormControl('', [Validators.required]),
    fname:new FormControl('', [Validators.required]),
    height:new FormControl('', [Validators.required]),
    lname:new FormControl('', [Validators.required]),
    motherBirthPlace:new FormControl('', [Validators.required]),
    motherName:new FormControl('', [Validators.required]),
    nakshatra:new FormControl('', [Validators.required]),
    occupation:new FormControl('', [Validators.required]),
    siblingBoys:new FormControl(0, [Validators.required]),
    siblingGirls:new FormControl(0, [Validators.required]),
    willingCaste:new FormControl('', [Validators.required]),
    zodiacSign:new FormControl('', [Validators.required]),
    time:new FormControl([Validators.required]),
    category:new FormControl([Validators.required])
    });


    addPost(){
      debugger
      if(this.groomAndBrideDetails.valid){
        const matrimonyDetails = this.groomAndBrideDetails.value;
        
        this.__firebase.addMatrimonyDetailsPost(matrimonyDetails)
      .then((isValid: any) => {
        if (isValid) {
          console.log("successfully added")
          this.groomAndBrideDetails.reset();
        } else {
          console.log('Invalid credentials');
        }
      })
      .catch((error: any) => {
        console.error('Login error:', error);
      });

      }else{

      }
    }

}
