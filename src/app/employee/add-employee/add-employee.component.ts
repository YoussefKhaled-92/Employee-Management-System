import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentReadDto } from 'src/app/dtos/departmentRead.dto';
import { EmployeeAddDto } from 'src/app/dtos/employeeAdd.dto';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-Employee',
  templateUrl: './add-Employee.component.html',
  styleUrls: ['./add-Employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  public departments: DepartmentReadDto[] = [];

  constructor(
    private EmployeeService: EmployeeService,
    private DepartmentService: DepartmentService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.DepartmentService.GetAll().subscribe((data) => {
      this.departments = data;
    });
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    age: new FormControl('', [
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
    departmentId: new FormControl(0, [Validators.required, Validators.min(1)]),
    hiringDate: new FormControl(new Date(), Validators.required),
    isActive: new FormControl(true, Validators.required),
  });

  submitForm() {
    const newEmployee = new EmployeeAddDto();
    newEmployee.name = this.form.controls.name.value!;
    newEmployee.age = +this.form.controls.age.value!;
    newEmployee.nationalId = this.form.controls.nationalId.value!;
    newEmployee.phone = this.form.controls.phone.value!;
    newEmployee.mobileNumber = this.form.controls.mobileNumber.value!;
    newEmployee.position = this.form.controls.position.value!;
    newEmployee.DepartmentId = this.form.controls.departmentId.value!;
    newEmployee.hiringDate = this.form.controls.hiringDate.value!;
    newEmployee.isActive = this.form.controls.isActive.value!;
    this.EmployeeService.AddEmployee(newEmployee).subscribe((data) => {
      this.route.navigate(['./employee']);
    });
  }

  get name() {
    console.log(this.form);
    return this.form.get('name')!;
  }
  get deparmentId() {
    return this.form.get('departmentId')!;
  }
  get age() {
    return this.form.get('age')!;
  }

  get nationalId() {
    return this.form.get('nationalId')!;
  }

  get phone() {
    return this.form.get('phone')!;
  }

  get mobileNumber() {
    return this.form.get('mobileNumber')!;
  }

  get position() {
    return this.form.get('position')!;
  }

  get hiringDate() {
    return this.form.get('hiringDate')!;
  }

  get isActive() {
    return this.form.get('isActive')!;
  }
}
