import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginStatus = false
  constructor( private fb:FormBuilder ) { }
  loginForm = this.fb.group({
    username: undefined,
    password: undefined
  })
    
    ngOnInit(): void {
      this.loginForm = new FormGroup({
        username: new FormControl(this.loginForm.value.username, [
          Validators.required
        ]),
        password:new FormControl(this.loginForm.value.password, [
          Validators.required
        ])
      })
    }

    //get methods
    get username(){
      return this.loginForm.get('username')
    }

    get password(){
      return this.loginForm.get('password')
    }


    userLogin(){
      this.loginStatus =true
      const valid=this.loginForm.valid
      if (valid){
        console.log("form submit");
      }
        
    }
}
