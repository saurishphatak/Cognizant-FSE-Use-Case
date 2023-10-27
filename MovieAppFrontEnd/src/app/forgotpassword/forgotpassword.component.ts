import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  form: FormGroup;

  constructor(public service: UserService, private router: Router, private toastr: ToastrService, fb: FormBuilder) {
    this.form = fb.group({
      loginId: fb.control('', [Validators.required]),
      newPassword: fb.control('', [Validators.required]),
      confirmNewPassword: fb.control('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/movies');
    }
  }

  onSubmit() {
    if (!this.form.valid) return;
    let loginId = this.form.get('loginId')?.value;
    let newPassword = this.form.get('newPassword')?.value;
    let confirmNewPassword = this.form.get('confirmNewPassword')?.value;

    this.service.forgotPassword({ loginId, newPassword, confirmNewPassword }).
      subscribe(
        (res) => {
          console.log(res);
        },
        err => {
          if (err.status == 400) {
            if (newPassword != confirmNewPassword) {
              this.toastr.error("Passwords do not match.")
            }
            else {
              this.toastr.error(err.error);
            }
          }
          if (err.status == 200) {
            this.toastr.success("Password updated successfully.")
            this.router.navigateByUrl('/login');
          }
        }
      );
  }
}
