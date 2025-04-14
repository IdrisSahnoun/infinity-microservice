import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CoursesComponent } from './courses/courses.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { StatistiquesDashboardComponent } from './mic1/statistiques/dashboard/statistiques-dashboard.component';
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactComponent} from "./contact/contact.component";
import {ProductsComponent} from "./mic2/products/products.component";
import {FoodListComponent} from "./mic3/food-list/food-list.component";
import {BmiCalculatorComponent} from "./mic3/bmi-calculator/bmi-calculator.component";
import { AbonnementComponent } from './mic5/abonnement/abonnement.component';


// Declare routes outside the class
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent },
  { path: 'team', component: OurTeamComponent },
  { path: 'testemonial', component: TestimonialComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mic1/statistiques/dashboard', component: StatistiquesDashboardComponent },
  {path : 'products', component: ProductsComponent },
  {path: 'food-list', component: FoodListComponent},
  { path: 'bmi-calculator', component: BmiCalculatorComponent },
  { path: 'abonnements', component: AbonnementComponent },



  { path: '**', component: NotfoundComponent }, // Keep this as the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
