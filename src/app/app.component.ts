import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./reusable/header/header.component";
import { FooterComponent } from "./reusable/footer/footer.component";
import{HomeComponent} from "./pages/home/home.component"
import { MatrimonyComponent } from './pages/matrimony/matrimony.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from "./pages/contact/contact.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, MatrimonyComponent, LoginComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kalai-sankara';
}
