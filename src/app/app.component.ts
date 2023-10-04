import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OSP-angular-assessment';
  routeUrl: string = '';
  constructor(private router: Router, private activeRoute: ActivatedRoute) {

  };
  ngOnInit() {
    const token = localStorage.getItem('token');
    this.routeUrl = window.location.pathname;
    console.log(this.activeRoute)
    if (token) {
      this.router.navigate([this.routeUrl])
    } else {
      // this.router.navigate(['/home'])
    }
  };
}
