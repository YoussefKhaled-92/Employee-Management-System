import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DepartmentReadDto } from '../dtos/departmentRead.dto';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  GetAll() {
    return this.http.get<DepartmentReadDto[]>(this.baseUrl + `api/department`);
  }
}
