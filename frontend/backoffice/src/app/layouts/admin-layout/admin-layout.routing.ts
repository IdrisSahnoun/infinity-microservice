import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {FoodListComponent} from "../../mic3/food-list/food-list.component";

import {AddStockItemComponent} from "../../mic2/add-stock-item/add-stock-item.component";
import {ListStockComponent} from "../../mic2/list-stock/list-stock.component";
import {UpdateStockComponent} from "../../mic2/update-stock/update-stock.component";
import { PlansComponent } from 'app/plans/plans.component';
import { AdminEventsComponent } from 'app/admin/admin-events/admin-events.component';
import { CreateEventComponent } from 'app/admin/create-event/create-event.component';
import { EventParticipantsComponent } from 'app/admin/event-participants/event-participants.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'food-list', component: FoodListComponent },

    {path: 'stock/add', component: AddStockItemComponent },
    {path:'stock/list', component: ListStockComponent },
    { path: 'stock/edit/:id', component: UpdateStockComponent },
   { path: 'plans', component: PlansComponent }, // Missing comma was here
   { path: 'admin/events', component: AdminEventsComponent },
{ path: 'admin/events/create', component: CreateEventComponent },
{ path: 'admin/events/:id/participants', component: EventParticipantsComponent },

];
