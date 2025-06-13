import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GroomAndBrideDetails } from '../../model/GroomAndBrideDetails';
import { FirebaseService } from '../../services/firebase.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { Reviews } from '../../model/Reviews';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  __firebase: FirebaseService = inject(FirebaseService);

  matrimonyDetails: GroomAndBrideDetails[] = [];
  allMatrimonyDetails: GroomAndBrideDetails[] = [];
  reviewsList: Reviews[] = [];
  allReviewsDetails: Reviews[] = [];
  selectedCategory: string = 'all';
  clickCount: number = 0;
  showAll: boolean = false;

  currentReview: any;
  currentIndex: number = 0;
  isLoading: boolean = true;

  age!: number;
  category!: string;
  location!: string;
  ngOnInit(): void {
    this.getAllReviews();
    this.fetchMatrimonyDetails('all');
  }

  fetchMatrimonyDetails(category: string): void {
    this.selectedCategory = category;

    this.__firebase.getMatrimonyDetails(category).subscribe(
      (data) => {
        this.allMatrimonyDetails = data;
        this.matrimonyDetails = this.allMatrimonyDetails.slice(0, 9);
        console.log('Filtered data:', data);
      },
      (error) => {
        console.error('Something went wrong while getting matrimony details');
      }
    );
  }
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchText = input.value;
    this.searchMatrimonyDetails(searchText);
    console.log(searchText);
  }
  searchMatrimonyDetails(searchText: string): void {
    const text = searchText.toLowerCase().trim();
    if (!text) {
      this.matrimonyDetails = this.allMatrimonyDetails;
      return;
    }

    this.matrimonyDetails = this.allMatrimonyDetails.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(text)
      )
    );
  }

  showAllRecords() {
    this.showAll = !this.showAll;
    // this.matrimonyDetails = this.allMatrimonyDetails;
    if (this.showAll) this.matrimonyDetails = this.allMatrimonyDetails;
    else this.matrimonyDetails = this.allMatrimonyDetails.slice(0, 9);
  }

  // getAllReviews() {
  //   this.__firebase.getReviewDetails().subscribe(
  //     data => {
  //       this.allReviewsDetails = data;
  //       this.reviewsList = this.allReviewsDetails.slice(1, 2);
  //       console.log('reviews data:', this.reviewsList);
  //     },
  //     error => {
  //       console.error('Something went wrong while getting matrimony details');
  //     }
  //   );
  // }

  getAllReviews() {
    this.isLoading = true;
    this.__firebase.getReviewDetails().subscribe(
      (data: any[]) => {
        this.allReviewsDetails = data;
        if (this.allReviewsDetails.length > 0) {
          this.currentReview = this.allReviewsDetails[0];
        }
        this.isLoading = false;
        console.log('reviews data:', this.allReviewsDetails);
      },
      (error) => {
        console.error('Error getting reviews:', error);
        this.isLoading = false;
      }
    );
  }

  nextReview() {
    if (this.allReviewsDetails.length === 0) return;

    this.currentIndex =
      this.currentIndex === this.allReviewsDetails.length - 1
        ? 0
        : this.currentIndex + 1;

    this.currentReview = this.allReviewsDetails[this.currentIndex];
  }

  prevReview() {
    if (this.allReviewsDetails.length === 0) return;

    this.currentIndex =
      this.currentIndex === 0
        ? this.allReviewsDetails.length - 1
        : this.currentIndex - 1;

    this.currentReview = this.allReviewsDetails[this.currentIndex];
  }

  searchMatrimonyDetailsByFewFields() {
  // Reset to all records before applying new filters
  this.matrimonyDetails = [...this.allMatrimonyDetails];

  // Convert empty strings ("") to undefined for age (if age is a number)
  const ageFilter = this.age.toString() === "" ? undefined : this.age;

  // Apply filters only if any field is defined
  if (ageFilter !== undefined || this.category !== undefined || this.location !== undefined) {
    this.matrimonyDetails = this.matrimonyDetails.filter(item => {
      const ageMatch = ageFilter === undefined || item.age === ageFilter;
      const categoryMatch = this.category === undefined || 
                          (item.category && item.category.toLowerCase() === this.category.toLowerCase());
      // const locationMatch = this.location === undefined || 
      //                      (item.location && item.location.toLowerCase() === this.location.toLowerCase());

      return ageMatch && categoryMatch ; //&& locationMatch
    });
  }
}
}
