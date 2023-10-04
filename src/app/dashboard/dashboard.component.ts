import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  patientForm: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'action'];
  dataSource: any[] = [];
  isEdit: boolean = false;
  constructor(private fb: FormBuilder, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });
    const data = {
      id: 1,
      firstName: 'name',
      lastName: 'last',
      address: 'dfkjbhdfkj'
    }
    this.dataSource.push(data);
  }

  submit() {

  }
}
