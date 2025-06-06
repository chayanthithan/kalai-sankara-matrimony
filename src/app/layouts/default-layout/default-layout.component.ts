import { Component } from '@angular/core';
import { HeaderComponent } from "../../reusable/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";

@Component({
  selector: 'app-default-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css'
})
export class DefaultLayoutComponent {

}
