import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Product } from '../../models/IAllProducts';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent { 

  bigImagePath=''
  pid = '';
  product:Product | null =null

  constructor (
    private route:ActivatedRoute,
    private api:ApiService
  ){
    this.route.paramMap.forEach(item => {
      const pullPid= item.get('pid')
      if(pullPid){
        //this.pid=Number(pullPid);
        this.pid=pullPid
      }
    })
  }

  ngOnInit(): void {
    const newThis=this
    this.api.singleProduct(this.pid).subscribe({
      next(value){
        newThis.product=value;
        newThis.bigImagePath=value.images[0];
      },
      error(err) {
        
      },
    });
  }

  bigImageChange(path:string){
    this.bigImagePath=path;
  }
}
