import { Routes } from '@angular/router';

import { SalleListComponent } from './salles/salle-list/salle-list.component';
import { SalleFormComponent } from './salles/salle-form/salle-form.component';
import { SportListComponent } from './sports/sport-list/sport-list.component';
import { SportFormComponent } from './sports/sport-form/sport-form.component';

export const Microservice1Routes: Routes = [
  {
    path: 'microservice1',
    children: [
      {
        path: 'salles',
        component: SalleListComponent
      },
      {
        path: 'salles/create',
        component: SalleFormComponent
      },
      {
        path: 'salles/edit/:id',
        component: SalleFormComponent
      },
      {
        path: 'sports',
        component: SportListComponent
      },
      {
        path: 'sports/create',
        component: SportFormComponent
      },
      {
        path: 'sports/edit/:id',
        component: SportFormComponent
      },
      {
        path: '',
        redirectTo: 'salles',
        pathMatch: 'full'
      }
    ]
  }
]; 