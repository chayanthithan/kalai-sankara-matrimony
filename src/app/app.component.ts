import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./reusable/header/header.component";
import { FooterComponent } from "./reusable/footer/footer.component";
import{HomeComponent} from "./pages/home/home.component"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kalai-sankara';
}
