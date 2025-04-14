import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SalleListComponent, SalleFormComponent } from './salles';
import { SportListComponent, SportFormComponent } from './sports';
import { Microservice1Routes } from './microservice1.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(Microservice1Routes),
    HttpClientModule
  ],
  declarations: [
    SalleListComponent,
    SalleFormComponent,
    SportListComponent,
    SportFormComponent
  ]
})
export class Microservice1Module { } 