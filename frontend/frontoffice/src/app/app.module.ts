import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {NgOptimizedImage} from "@angular/common";
import { BannerComponent } from './banner/banner.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CoursesComponent } from './courses/courses.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactComponent } from './contact/contact.component';
import { StatistiquesDashboardComponent } from './mic1/statistiques/dashboard/statistiques-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './mic2/products/products.component';
import { FoodListComponent } from './mic3/food-list/food-list.component';
import { BmiCalculatorComponent } from './mic3/bmi-calculator/bmi-calculator.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AbonnementComponent } from './mic5/abonnement/abonnement.component'; // Correct import statement
import { FormsModule } from '@angular/forms'; // Importez FormsModule



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
    ProductsComponent, // Gardez une seule déclaration
    FoodListComponent,
    BmiCalculatorComponent,
    AbonnementComponent, // Déclaration correcte
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage, HttpClientModule, ReactiveFormsModule,  
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }