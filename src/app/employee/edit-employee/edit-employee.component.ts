import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentReadDto } from 'src/app/dtos/departmentRead.dto';
import { EmployeeReadDto } from 'src/app/dtos/employeeRead.dto';
import { EmployeeUpdateDto } from 'src/app/dtos/employeeUpdate.dto';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-Employee',
  templateUrl: './edit-Employee.component.html',
  styleUrls: ['./edit-Employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  Employee!: EmployeeReadDto;
  EmployeeUpdated!: EmployeeUpdateDto;
  Departments: DepartmentReadDto[] = [];

  constructor(
    private EmployeeService: EmployeeService,
    private DepartmentService: DepartmentService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.EmployeeService.GetEmployee().subscribe((data) => {
      this.Employee = data;
      console.log('[EditEmployeeComponent] ngOnInit() - this.Employee:', this.Employee);

      this.form.patchValue({
        name: this.Employee.name,
        age: this.Employee.age,
        nationalId: this.Employee.nationalId,
        phone: this.Employee.phone,
        mobileNumber: this.Employee.mobileNumber,
        position: this.Employee.position,
        DepartmentId: this.Employee.departmentId,
        isActive: this.Employee.isActive,
        hiringDate: this.Employee.hiringDate,
      });
    });
    this.DepartmentService.GetAll().subscribe((data) => {
      this.Departments = data;
    });
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    age: new FormControl(0, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.max(100),
      Validators.min(10),
    ]),
    nationalId: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(14),
      Validators.maxLength(14),
    ]),
    phone: new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    position: new FormControl('', Validators.required),
    DepartmentId: new FormControl(0, Validators.required),
    hiringDate: new FormControl(new Date(), Validators.required),
    isActive: new FormControl(true, Validators.required),
  });

  submitForm() {
    console.log(this.form);
    const updateEmployee = new EmployeeUpdateDto();
    updateEmployee.id = this.Employee.id;
    updateEmployee.name = this.form.controls.name.value!;
    updateEmployee.age = +this.form.controls.age.value!;
    updateEmployee.nationalId = this.form.controls.nationalId.value!;
    updateEmployee.phone = this.form.controls.phone.value!;
    updateEmployee.mobileNumber = this.form.controls.mobileNumber.value!;
    updateEmployee.position = this.form.controls.position.value!;
    updateEmployee.DepartmentId = this.form.controls.DepartmentId.value!;
    updateEmployee.hiringDate = this.form.controls.hiringDate.value!;
    updateEmployee.isActive = this.form.controls.isActive.value!;
    console.log(updateEmployee);
    this.EmployeeService.UpdateEmployee(updateEmployee).subscribe((data) => {
      this.route.navigate(['./employee']);
    });
  }

  SelectCurrentDepartment(event: any) {
    this.form.controls['DepartmentId'].setValue(event);
  }

  SelectCurrentDate(event: any) {
    this.form.controls['hiringDate'].setValue(event);
  }
}
