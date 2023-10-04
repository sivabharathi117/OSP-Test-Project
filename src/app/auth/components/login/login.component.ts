import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  rememberMe: boolean = false;
  loginError: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%^&*]{6,16}$')]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.loginError = '';
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.id && response.token) {
            localStorage.setItem('userDetails', JSON.stringify(response));
            // this.router.navigate(['/dashboard'])
          }
        },
        error: (errorResponse) => {
          this.loginError = errorResponse.error?.message || 'Something went wrong';
        }
      })
    }
  }
}

