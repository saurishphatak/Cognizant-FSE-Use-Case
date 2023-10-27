import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel = {
    loginId: '',
    password: ''
  }

  form: FormGroup;

  constructor(public service: UserService, private router: Router, private toastr: ToastrService, fb: FormBuilder) {
    this.form = fb.group({
      loginId: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required])
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
    let password = this.form.get('password')?.value;

    this.service.login({ loginId, password }).
      subscribe(
        {
          next: (res: any) => {
            localStorage.setItem('token', res.jwtToken);
            localStorage.setItem('username', res.loginId);
            this.router.navigateByUrl('/movies');
          },
          error: err => {
            if (err.status == 400) {
              console.log(err);
              this.toastr.error(err.error);
            }
          }
        }

      );
  }


}

