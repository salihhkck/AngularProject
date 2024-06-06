import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAllProducts } from '../../models/IAllProducts';
import { allProduct_url } from '../../utils/util';
import { CryptoService } from './crypto.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token = ''
  private headers={}
  constructor(private http:HttpClient, crypto:CryptoService, private router : Router) { 

    const user = crypto.getUser()
    if(user){
      this.token=user.token
      this.headers={
        'Authorization': 'Bearer ' + this.token}
      }
      else{
      this.router.navigate(['/'])
      }   
  }

  allProducts(){
    return this.http.get<IAllProducts>(allProduct_url)
  }
}
