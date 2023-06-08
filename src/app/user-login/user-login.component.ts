import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  signupUsers:any[]=[];
  signupObj:any ={
    userName:'',
    email:'',
    password:''
  };
  loginObj:any ={
    userName:'',
    password:''
  };
  constructor() {}
  ngOnInit():void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData !=null){
      this.signupUsers=JSON.parse(localData);
    }
  }

  onSignUp(){
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj ={
      userName:'',
      email:'',
      password:''
    };
  }
  onLogin(){
    console;
    const isUserExist=this.signupUsers.find(m=>m.userName== this.loginObj.userName &&
    m.password==this.loginObj.password);
    if(isUserExist!= undefined){
      alert('User Login Successfully!');
    }
    else {
      alert('Wrong credentials!');
    }
  }
}
