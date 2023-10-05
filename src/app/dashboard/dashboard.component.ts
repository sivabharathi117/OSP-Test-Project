import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public userDetails: any;

  constructor(private router: Router, private dialog: MatDialog) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  }

  public logout(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        confirmButtonText: 'Logout',
        confirmationMessage: 'Are you sure want to logout?',
        confirmationTitle: 'Confirm Logout'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.clear();
        this.router.navigate(['/auth/login'])
      }
    });

  }

}
