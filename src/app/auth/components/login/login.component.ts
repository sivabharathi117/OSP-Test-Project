import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  public rememberMe: boolean = false;
  public loginError: string = '';
  public disableSubmit: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard'])
    } else {
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%^&*]{6,16}$')]]
      });
    }
  }

  public login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.disableSubmit = true;
      this.spinner.show();
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.spinner.hide();
          if (response.id && response.token) {
            localStorage.setItem('userDetails', JSON.stringify(response));
            localStorage.setItem('token', response.token)
            this.router.navigate(['/dashboard'])
          }
        },
        error: (errorResponse) => {
          this.spinner.hide();
          this.loginError = errorResponse.error?.message || 'Something went wrong';
          this.disableSubmit = false;
        }
      })
    }
  }
}

