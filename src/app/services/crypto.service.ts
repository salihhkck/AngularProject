import { trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js'
import { IUser } from '../../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  secretKey='081023Sb'
  constructor() { }

  encrypt(plainText:string){
      const cipherText= crypto.AES.encrypt(plainText, this.secretKey).toString()
      return cipherText;
  }

  decrypt(cipherText:string){
    try {
      const bytes=crypto.AES.decrypt(cipherText,this.secretKey)
      const plainText=bytes.toString(crypto.enc.Utf8)
      return plainText;

    } catch (error) {
      return null;
    }
   
  }

  setUser = (user:IUser) => { 
    const stUser = JSON.stringify(user)
    localStorage.setItem('user', this.encrypt(stUser) )
}


getUser = ()  => {
    let stUser =localStorage.getItem('user')
    if(stUser){
      try {
        stUser=this.decrypt(stUser)
        if(stUser){
          const userObj= JSON.parse(stUser);
          const user = userObj as IUser;
          return user;
        }else{
          localStorage.removeItem('user')
        }
       
      } catch (error) {
        localStorage.removeItem('user')
      }
        
        
        
    }
    return null;
}

}
