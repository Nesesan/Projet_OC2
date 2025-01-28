import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/']);
  }
}
