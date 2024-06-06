import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../../models/IAllProducts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  products:Product[] = []
  singleProduct: Product | null = null
  constructor( private api:ApiService ) {
    const newThis = this
    api.allProducts().subscribe({
      next(value) {
        newThis.products = value.products
      },
      error(err) {
        
      },
    })
  }

  singleSelectItem( index: number ) {
    this.singleProduct = this.products[index]
  }


}