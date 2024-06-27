import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeePaginated } from 'src/app/dtos/employeePaginated.dto';
import { EmployeeReadDto } from '../../dtos/employeeRead.dto';
import { DepartmentReadDto } from 'src/app/dtos/departmentRead.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-Employee',
  templateUrl: './list-Employee.component.html',
  styleUrls: ['./list-Employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  public EmployeePaginated!: EmployeePaginated;
  page: number = 1;
  countPerPage = 2;
  totalCount: number | undefined;
  name: string = '';
  Departments: DepartmentReadDto[] = [];
  DepartmentId: number = 0;
  Employees: EmployeeReadDto[] = [];

  constructor(
    private EmployeeService: EmployeeService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees(1);
  }

  getEmployees(page: number) {
    this.GetAllEmployee(page);
  }

  GetAllEmployee(page: number) {
    this.EmployeeService.GetAll(page, this.countPerPage).subscribe((data) => {
      this.page = page;
      this.Employees = data.employees;
      this.totalCount = data.count;
    });
  }

  // SelectName(name: string, page: number = 1) {
  //   this.name = name;
  //   this.page = 1;
  //   this.getEmployees(1);
  // }
  // GetDepartments() {
  //   this.EmployeeService.GetAllDepartments().subscribe((data) => {
  //     this.Departments = data;
  //   });
  // }
  // SelectDepartment(event:any)
  // {
  //   this.DepartmentId = event;
  // }
  // GetEmployeeByName(page:number){
  //   this.EmployeeService.GetByName(this.name,page,this.countPerPage).subscribe(data=>{
  //     this.page = page;
  //     this.Employees = data.Employees;
  //     this.totalCount = data.count;
  //   })
  // }
  // GetEmployeeByDepartment(page:number)
  // {
  //   this.EmployeeService.GetByDepartment(this.DepartmentId,page,this.countPerPage).subscribe(data=>{
  //     this.page;
  //     this.Employees = data.Employees;
  //     this.totalCount = data.count;
  //   })
  // }
  // GetEmployeeByNameAndDepartment(page:number)
  // {
  //   this.EmployeeService.GetByNameAndDepartment(this.name,this.DepartmentId,page,this.countPerPage).subscribe(data=>{
  //     this.page;
  //     this.Employees = data.Employees;
  //     this.totalCount = data.count;
  //   })
  // }

  Edit(Employee: EmployeeReadDto) {
    this.EmployeeService.SetEmployee(Employee);
    this.route.navigate(['./employee/edit']);
  }

  Delete(Employee: EmployeeReadDto) {
    console.log('ay haga');
    this.EmployeeService.DeleteEmployee(Employee.id).subscribe((data) => {
      this.GetAllEmployee(1);
    });
  }
}
