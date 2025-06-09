import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GroomAndBrideDetails } from '../../model/GroomAndBrideDetails';
import { FirebaseService } from '../../services/firebase.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  __firebase:FirebaseService = inject(FirebaseService)
  
  matrimonyDetails:GroomAndBrideDetails[] = [];
  selectedCategory: string = 'all';
  
  ngOnInit(): void {
    this.__firebase.getMatrimonyDetails()
    .subscribe(data=>{
      this.matrimonyDetails = data;
      console.log(this.matrimonyDetails);
    },error=>{
      console.log("something wrong to getting matrimony details");
    })
  }

  selectCategory(category: string): void {
  this.selectedCategory = category;
  console.log('Selected:', category);
  // you can filter data here if needed
}

}
