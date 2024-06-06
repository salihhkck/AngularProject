import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { login_url } from '../../utils/util';
import { IUser } from '../../models/IUser';
import { Router } from '@angular/router';
import { CryptoService } from '../services/crypto.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginStatus = false
  loginError = ''
  constructor(
     private fb:FormBuilder,
     private http: HttpClient, 
     private router: Router,
     private crypto:CryptoService
    ) {
    const user = this.crypto.getUser()
    if (user) {
      console.log(user)
    }
   }

  loginForm = this.fb.group({
    username: '',
    password: ''
  })

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('emmaj', [
        Validators.required
      ]),
      password: new FormControl('emmajpass', [
        Validators.required
      ])
    })
  }

  // Get methods
  get username() {
    return this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password')
  }

  userLogin() {
    this.loginStatus = true
    this.loginError = ''
    const valid = this.loginForm.valid
    if (valid) {

    const username = this.username?.value
    const password = this.password?.value
    const sendObj = {
      username: username,
      password: password
    }

    const newThis = this
    this.http.post<IUser>(login_url, sendObj).subscribe({
      next(res) {
        newThis.crypto.setUser(res)
        newThis.router.navigate(['/dashboard'])
      },
      error(err) {
        console.error(err.error.message)
        newThis.loginError = err.error.message
      },
    })

    console.log("this line call")
    }
  }

}