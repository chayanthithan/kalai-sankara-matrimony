import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
headers = ['Name', 'Email', 'Phone', 'Address','Name', 'Email', 'Phone', 'Address', 'City', 'State', 'Zip', 'Country', 'Role', 'Status', 'Actions'];

data = [
  ['John', 'john@example.com', '123456', '123 St','John', 'john@example.com', '123456', '123 St', 'NY', 'NY', '10001', 'USA', 'Admin', 'Active'],
  ['John', 'john@example.com', '123456', '123 St','John', 'john@example.com', '123456', '123 St', 'NY', 'NY', '10001', 'USA', 'Admin', 'Active'],
  // more rows
];

edit(row: any) {
  console.log('Edit', row);
}

delete(row: any) {
  console.log('Delete', row);
}

}
