import { Component } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {

  public patientForm: FormGroup = new FormGroup({});
  public displayedColumns: string[] = ['firstName', 'lastName', 'address', 'action'];
  public dataSource: any[] = [];
  public isEdit: boolean = false;
  public searchValue: string = '';
  public isSubmitted: boolean = false;
  constructor(private fb: FormBuilder, private patientsService: PatientsService, private spinner: NgxSpinnerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.patientForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+(?:\d){1,3}(?:\d|\s|\(|\)|-){8,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });
    this.getPatientsList();
  }

  private getPatientsList(): void {
    this.spinner.show();
    this.patientsService.getPatients().subscribe({
      next: (response) => {
        this.spinner.hide();
        if (response.users.length) {
          this.dataSource = [...response.users];
        } else {
          this.dataSource = [];
        }
      },
      error: () => {
        this.spinner.hide();
      }
    })
  }

  public editPatient(patientDetails: any): void {
    this.patientForm.patchValue({
      id: patientDetails.id,
      firstName: patientDetails.firstName,
      lastName: patientDetails.lastName,
      phone: patientDetails.phone,
      email: patientDetails.email,
      address1: patientDetails.address.address,
      address2: patientDetails.company.address.address,
      city: patientDetails.address.city,
      state: patientDetails.address.state,
      zipCode: patientDetails.address.postalCode
    });
    this.isEdit = true;
  }

  public submit(): void {
    this.isSubmitted = true;
    this.patientForm.markAllAsTouched();
    if (this.patientForm.valid) {
      const patientData = {
        firstName: this.patientForm.value.firstName,
        lastName: this.patientForm.value.lastName,
        phone: this.patientForm.value.phone,
        email: this.patientForm.value.email,
        address: {
          address: this.patientForm.value.address1,
          city: this.patientForm.value.city,
          state: this.patientForm.value.state,
          postalCode: this.patientForm.value.zipCode
        },
        company: {
          address: {
            address: this.patientForm.value.address2
          }
        }
      }
      if (this.isEdit) {
        this.spinner.show();
        this.patientsService.updatePatient(patientData, this.patientForm.value.id).subscribe({
          next: () => {
            this.getPatientsList();
            this.isEdit = false;
            this.patientForm.reset();
            this.patientForm.updateValueAndValidity()
            this.isSubmitted = false;
            this.spinner.hide();
          },
          error: () => {
            this.spinner.hide();
          }
        })
      } else {
        this.spinner.show();
        this.patientsService.addPatient(patientData).subscribe({
          next: (response) => {
            this.getPatientsList();
            this.patientForm.reset();
            this.isSubmitted = false;
            this.spinner.hide();
          },
          error: () => {
            this.spinner.hide();
          }
        })
      }
    }

  }

  public cancel(): void {
    this.isEdit = false;
    this.patientForm.reset();
    this.isSubmitted = false;
  }

  public deletePatient(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        confirmButtonText: 'Delete',
        confirmationMessage: 'Are you sure want to delete?',
        confirmationTitle: 'Confirm Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.patientsService.deletePatient(id).subscribe({
          next: () => {
            this.getPatientsList();
            this.spinner.hide();
          },
          error: () => {
            this.spinner.hide();
          }
        })
      }
    })

  }

  public search(searchValue: string): void {
    if (searchValue) {
      this.spinner.show();
      this.patientsService.search(searchValue).subscribe({
        next: (response) => {
          if (response.users.length) {
            this.dataSource = [...response.users];
          } else {
            this.dataSource = [];
          }
          this.spinner.hide();
        },
        error: (errorResponse) => {
          this.spinner.hide();
        }
      })
    } else {
      this.getPatientsList();
    }

  }
}
