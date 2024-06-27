import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentReadDto } from '../dtos/departmentRead.dto';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-carousel-flip-cards',
  templateUrl: './carousel-flip-cards.component.html',
  styleUrls: ['./carousel-flip-cards.component.css'],
})
export class CarouselFlipCardsComponent implements OnInit {
  Departments: DepartmentReadDto[] = [];

  constructor(
    private DepartmentService: DepartmentService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.GetDepartments();
  }

  GetDepartments() {
    this.DepartmentService.GetAll().subscribe((data) => {
      this.Departments = data;
    });
  }
}
