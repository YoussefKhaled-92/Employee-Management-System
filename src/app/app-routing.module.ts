import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselFlipCardsComponent } from './carousel-flip-cards/carousel-flip-cards.component';

const routes: Routes = [
  { path: '', component: CarouselFlipCardsComponent },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule) },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
