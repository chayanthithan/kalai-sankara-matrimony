import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router){}

  __firebase:FirebaseService = inject(FirebaseService)

myForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });


   doLogin() {
     this.myForm.get('role')?.setValue('ADMIN');
  if (this.myForm.valid) {
    debugger
    const loginData = this.myForm.value;

    this.__firebase.validateAdminLogin(loginData.username!, loginData.password!)
      .then((isValid: any) => {
        if (isValid) {
          
          this.router.navigate(['/admin'])
        } else {
          console.log('Invalid credentials');
        }
      })
      .catch((error: any) => {
        console.error('Login error:', error);
      });
  } else {
    console.log('Form is invalid');
  }
}

}
