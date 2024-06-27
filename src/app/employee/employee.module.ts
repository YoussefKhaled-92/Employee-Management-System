import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [ListEmployeeComponent, AddEmployeeComponent, DetailEmployeeComponent, EditEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSlideToggleModule,
    TranslateModule.forChild(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class EmployeeModule {}
