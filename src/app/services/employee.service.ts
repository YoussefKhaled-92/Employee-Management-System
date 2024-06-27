import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EmployeePaginated } from '../dtos/employeePaginated.dto';
import { EmployeeAddDto } from '../dtos/employeeAdd.dto';
import { EmployeeReadDto } from '../dtos/employeeRead.dto';
import { BehaviorSubject, of } from 'rxjs';
import { EmployeeUpdateDto } from '../dtos/employeeUpdate.dto';
import { DepartmentReadDto } from '../dtos/departmentRead.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }
  private baseUrl: any;
  private Employee!: EmployeeReadDto;
  private EmployeeSubject = new BehaviorSubject<EmployeeReadDto>(this.Employee);

  GetAll(page: number = 1, countPerPage: number = 10) {
    return this.http.get<EmployeePaginated>(
      this.baseUrl + `api/Employee/${page}/${countPerPage}`
    );
  }
  GetByName(name: string, page?: number, countPerPage?: number) {
    return this.http.get<EmployeePaginated>(this.baseUrl + `api/Employee/${page}/${countPerPage}`, {
      params: { name: name },
    });
  }

  GetByDepartment(DepartmentId: number, page?: number, countPerPage?: number) {
    return this.http.get<EmployeePaginated>(this.baseUrl + `api/Employee/${page}/${countPerPage}`, {
      params: { Department: DepartmentId },
    });
  }
  GetByNameAndDepartment(name: string, DepartmentId: number, page?: number, countPerPage?: number) {
    return this.http.get<EmployeePaginated>(this.baseUrl + `api/Employee/${page}/${countPerPage}`, {
      params: { Department: DepartmentId, name: name },
    });
  }
  GetAllDepartments() {
    return this.http.get<DepartmentReadDto[]>(this.baseUrl + `api/Department`);
  }
  AddEmployee(Employee: EmployeeAddDto) {
    return this.http.post(this.baseUrl + `api/Employee`, Employee);
  }
  UpdateEmployee(Employee: EmployeeUpdateDto) {
    return this.http.put(this.baseUrl + `api/Employee`, Employee);
  }
  SetEmployee(Employee: EmployeeReadDto) {
    this.Employee = Employee;
    return this.EmployeeSubject.next(Employee);
  }
  GetEmployee() {
    return this.EmployeeSubject.asObservable();
  }

  DeleteEmployee(id: number) {
    return this.http.delete(this.baseUrl + `api/Employee/${id}`);
  }
}
