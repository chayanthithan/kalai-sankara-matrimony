import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addpost',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent implements OnInit{
  ngOnInit(): void {
    console.log("hi add post component");
  }
  myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
}
