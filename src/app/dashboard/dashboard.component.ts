import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private api:ApiService){
    api.allProducts().subscribe({
      next(value) {
        console.log(value)
      },
      error(err) {

      },
    })
  }
}