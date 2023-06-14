import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  signupUsers:any[]=[];
  signupObj:any ={
    name:'',
    email:'',
    password:''
  };
  loginObj:any ={
    name:'',
    password:''
  };
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  ngOnInit():void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData !=null){
      this.signupUsers=JSON.parse(localData);
    }
  }

  onSignUp(){
    console.log(this.signupObj)
    this.auth.signup(this.signupObj)
      .subscribe({
        next:(res)=>{
          alert(res.message)
        },
        error: (err)=>{
          alert(err?.error.message)
        }
      })
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj ={
      name:'',
      email:'',
      password:''
    };

  }
  onLogin(){
    console.log(this.loginObj)
    this.auth.login(this.loginObj)
      .subscribe({
        next:(res)=>{
        alert(res.message)
    },
    error: (err)=>{
          alert(err?.error.message)
    }
      })

  }
}
//komentar dodan
