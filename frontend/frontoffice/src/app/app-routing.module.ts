import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CoursesComponent } from './courses/courses.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactComponent} from "./contact/contact.component";
import {ProductsComponent} from "./mic2/products/products.component";
import {FoodListComponent} from "./mic3/food-list/food-list.component";
import {BmiCalculatorComponent} from "./mic3/bmi-calculator/bmi-calculator.component";

import { PlanDetailsComponent } from './pages/plan-details/plan-details.component';
import { PlanListComponent } from './pages/plan-list/plan-list.component';
import { EventRegisterComponent } from './components/event-register/event-register.component';
import { EventListComponent } from './components/event-list/event-list.component';


// Declare routes outside the class
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent },
  { path: 'team', component: OurTeamComponent },
  { path: 'testemonial', component: TestimonialComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  {path : 'products', component: ProductsComponent },
  {path: 'food-list', component: FoodListComponent},
  { path: 'bmi-calculator', component: BmiCalculatorComponent },

  //{ path: 'plans', component: PlansComponent }, // Nouvelle route pour les plans
  //{ path: 'progression/:id', component: ProgressionComponent }, // Nouvelle route pour la progression
  { path: 'plans', component: PlanListComponent },
  { path: 'details/:id', component: PlanDetailsComponent },
  { path: 'events', component: EventListComponent },
  { path: 'register/:id', component: EventRegisterComponent },
  { path: '**', component: NotfoundComponent }, // Keep this as the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
