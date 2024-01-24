import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  loginForm=new FormGroup({
    Email:new FormControl("",[Validators.required,Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]),
    password:new FormControl("",[Validators.required,Validators.minLength(8)])
  })

  RegisterForm =new FormGroup({
    FullName:new FormControl("",[Validators.required,Validators.pattern('^[A-Z]{1}[a-z]{1,}(/s[A-Z]{1}[a-z]{1,})*$')]),
    MobileNumber:new FormControl("",Validators.required),
    Email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.minLength(8)]),
    Address: new FormControl("", Validators.required),
    State: new FormControl("", Validators.required),
    City: new FormControl("", Validators.required),

  })


  onLogin(){
    console.log(this.loginForm)
    let data = {
      email_Id: this.loginForm.value.Email,
      password: this.loginForm.value.password
    }
    this.userService.Login(data).subscribe((res: any) => {
      console.log(res.message);
      console.log(res.data);
      localStorage.setItem("token", res.data);
    });

  }

  onSignUp(){
    let data = {
      FullName: this.RegisterForm.value.FullName,
      email_Id: this.RegisterForm.value.Email,
      MobileNumber: parseInt(this.RegisterForm.value.MobileNumber),
      password: this.RegisterForm.value.password,
      Address: this.RegisterForm.value.Address,
      State: this.RegisterForm.value.State,
      City: this.RegisterForm.value.City


    }
    this.userService.Register(data).subscribe((res: any) => {
      console.log(res.message);
      console.log(res.data);
    })
     
  }
}

  
  


  

