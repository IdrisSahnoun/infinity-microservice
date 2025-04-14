import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

// Importation des composants
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CoursesComponent } from './courses/courses.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactComponent } from './contact/contact.component';
import { StatistiquesDashboardComponent } from './mic1/statistiques/dashboard/statistiques-dashboard.component';
import { ProductsComponent } from './mic2/products/products.component';
import { FoodListComponent } from './mic3/food-list/food-list.component';
import { BmiCalculatorComponent } from './mic3/bmi-calculator/bmi-calculator.component';
import { PlanListComponent } from './pages/plan-list/plan-list.component';
import { PlanDetailsComponent } from './pages/plan-details/plan-details.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventRegisterComponent } from './components/event-register/event-register.component';
import { AbonnementComponent } from './mic5/abonnement/abonnement.component'; // ✅ Ajouté ici

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    AboutUsComponent,
    CoursesComponent,
    OurTeamComponent,
    TestimonialComponent,
    NotfoundComponent,
    ContactComponent,
    StatistiquesDashboardComponent,
    ProductsComponent,
    FoodListComponent,
    BmiCalculatorComponent,
    PlanListComponent,
    PlanDetailsComponent,
    EventListComponent,
    EventRegisterComponent,
    AbonnementComponent, // ✅ Obligatoire pour utiliser ngModel dans ce composant
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // ✅ Import requis pour ngModel
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([]),
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
