import { EmployeeReadDto } from './employeeRead.dto';

export interface EmployeePaginated {
  employees: EmployeeReadDto[];
  count: number;
}
