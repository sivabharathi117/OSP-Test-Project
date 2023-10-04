import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm).subscribe((res) => {
        if (res.id && res.token) {
          localStorage.setItem('id', res.id);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home'])
        }
      })
    }
  }
}
