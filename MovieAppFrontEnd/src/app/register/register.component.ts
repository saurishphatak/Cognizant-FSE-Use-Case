import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Password_VALUE_ACCESSOR } from 'primeng/password';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, public service: UserService, private router: Router, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      loginId: ['', [Validators.required, Validators.minLength(4)]],
      contactNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/movies');
    }
  }

  onSubmit() {
    this.service.register(this.form.value).
      subscribe(
        (res: any) => {
          this.toastr.success(res);
          console.log(res);
        },
        err => {
          console.log("hello");
          console.log(err);
          if (err.status == 400) {
            if (this.form.value.password != this.form.value.confirmPassword) {
              this.toastr.error("Passwords do not match.")
            }
            else {
              this.toastr.error(err.error);
            }
          }
          if (err.status == 200) {
            this.toastr.success("Registration Successful.");
            this.router.navigateByUrl("/login");
          }
        }
      );
  }
}
