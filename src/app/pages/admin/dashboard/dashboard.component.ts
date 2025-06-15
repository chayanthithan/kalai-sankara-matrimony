import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FirebaseService } from '../../../services/firebase.service';
import { GroomAndBrideDetails } from '../../../model/GroomAndBrideDetails';
import { Reviews } from '../../../model/Reviews';
import { Contact } from '../../../model/Contact';
import { DeleteConfirmationDialogComponent } from '../../../popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,FormsModule,CommonModule,NzTabsModule,DeleteConfirmationDialogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private router:Router){

  }

  __firebase:FirebaseService = inject(FirebaseService);


  // array lists
  matrimonyDetailsList:GroomAndBrideDetails[] = [];
  reviewDetailsList:Reviews[] = [];
  contactDetailsList:Contact[] = [];
  matrimonyHeaders:string[] = [];

  // boolean variable
  isMatrimony:boolean = false;
  isContact:boolean = false;
  isReview:boolean = false;
ngOnInit(): void {
  this.getAllMatrimonyDetails();
  this.getAllReviewDetails();
  this.getAllContactDetails();
  
}

getAllMatrimonyDetails() {
  this.__firebase.getMatrimonyDetails().subscribe(
    (data) => {
      if (data && data.length > 0) {
        // Get headers (field names) from the first object
        this.matrimonyHeaders = Object.keys(data[0]);
        
        // Store the complete data
        this.matrimonyDetailsList = data;
      }
      console.log("matrimonyDetailsList:",data);
      console.log("headers:",this.matrimonyHeaders);
    },
    (error) => {
      console.error('Something went wrong while getting matrimony details');
    }
  );
}



triggerButtons(type:string){
  if(type === 'matrimonyDetails')
    {
      this.isReview = false;
      this.isMatrimony = true;
      this.isContact = false;
    }else if(type === 'reviews'){
      this.isReview = true;
      this.isMatrimony = false;
      this.isContact = false;
    }else if(type === 'contact'){
      this.isReview = false;
      this.isMatrimony = false;
      this.isContact = true;
    }
  }
  
  getAllReviewDetails(){
  this.__firebase.getReviewDetails().subscribe(
    (data) => {
      if (data && data.length > 0) {
        
        // Store the complete data
        this.reviewDetailsList = data;
      }
      console.log("reviewDetailsList:",this.reviewDetailsList);
    },
    (error) => {
      console.error('Something went wrong while getting matrimony details');
    }
  );
}

getAllContactDetails(){
  this.__firebase.getContactDetails().subscribe(
    (data) => {
      if (data && data.length > 0) {
        
        // Store the complete data
        this.contactDetailsList = data;
      }
      console.log("reviewDetailsList:",this.contactDetailsList);
    },
    (error) => {
      console.error('Something went wrong while getting matrimony details');
    }
  );
}
delete(row: any) {
  console.log('Delete', row);
}
onEdit(post: any) {
  this.__firebase.isViewMode = false;
  console.log("matrimony details which is share as param:",post)
    // Navigate to AddPost component with the post ID as a route parameter
    this.router.navigate(['/admin/addpost', post.id], {
      state: { postData: post } // Passing the entire post object via state
    });
  }
onView(post: any){
  this.__firebase.isViewMode = true;
  this.router.navigate(['/admin/addpost', post.id], {
      state: { postData: post } // Passing the entire post object via state
    });
}

showDeleteDialog = false;
postToDelete: any = null;

  // ... other code ...

  onDelete(post: any) {
    this.postToDelete = post;
    this.showDeleteDialog = true;
  }

  confirmDelete() {
    if (this.postToDelete) {
      // Call your delete service here
      console.log('Deleting post:', this.postToDelete.id);
      
      this.__firebase.deleteMatrimonyDetailsPost(this.postToDelete.id)
          .then((isValid: any) => {
              console.log("successfully deleted")
          })
          .catch((error: any) => {
            console.error('Login error:', error);
          });
      
      // After successful deletion
      this.showDeleteDialog = false;
      this.postToDelete = null;
      // Optionally refresh your posts list
    }
  }

  cancelDelete() {
    this.showDeleteDialog = false;
    this.postToDelete = null;
  }
}
