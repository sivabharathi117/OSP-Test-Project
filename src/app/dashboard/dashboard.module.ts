import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialLibModule } from '../modules/material-lib.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PatientsComponent } from './components/patients/patients.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PatientsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialLibModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-multiple' })
  ]
})
export class DashboardModule { }
