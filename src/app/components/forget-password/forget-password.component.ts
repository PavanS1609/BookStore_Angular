import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  ForgotPasswordForm = new FormGroup({
    Email: new FormControl("", Validators.required)

  })


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  onForgotPassword() {

    console.log(this.ForgotPasswordForm)
    let data = {
      Email_Id: this.ForgotPasswordForm.value.Email
    }
    this.userService.ForgotPassword(data).subscribe((res: any) => {
      console.log(res.message);
      console.log(res.data);

    })
  }

}
