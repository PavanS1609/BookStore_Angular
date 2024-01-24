import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/UserService/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ResetPasswordForm = new FormGroup({
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  })
  token: any;
  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) { 
    this.token = this.activeRoute.snapshot.paramMap.get('token');
  }

  ngOnInit(): void {
  }

  onResetPassword() {
    if (this.ResetPasswordForm.valid) {
      let data = {
        Password: this.ResetPasswordForm.value.password,
        ConfirmPassword: this.ResetPasswordForm.value.confirmPassword
      }
      this.userService.ResetPassword(data, this.token).subscribe((res: any) => {
        console.log(res.message);
      });
    }
    this.router.navigate(['/Login-SignUp']);
  }
}


