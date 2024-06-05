import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { login_url } from '../../utils/util';
import { IUser } from '../../models/IUser';

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
  constructor( private fb:FormBuilder, private http: HttpClient ) { }
  loginForm = this.fb.group({
    username: undefined,
    password: undefined
  })

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.loginForm.value.username, [
        Validators.required
      ]),
      password: new FormControl(this.loginForm.value.password, [
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
        console.log(res.email)
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