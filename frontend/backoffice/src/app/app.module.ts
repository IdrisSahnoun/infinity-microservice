import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { Microservice1Module } from './microservice1/microservice1.module';
import { AddStockItemComponent } from './mic2/add-stock-item/add-stock-item.component';
import { ListStockComponent } from './mic2/list-stock/list-stock.component';
import { UpdateStockComponent } from './mic2/update-stock/update-stock.component';
import { PlansComponent } from './plans/plans.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { CreateEventComponent } from './admin/create-event/create-event.component';
import { EventParticipantsComponent } from './admin/event-participants/event-participants.component';
import { AddMicComponent } from './mic/add-mic/add-mic.component';
import { EditMicComponent } from './mic/edit-mic/edit-mic.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    Microservice1Module
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UpdateStockComponent,
    PlansComponent,
    AdminEventsComponent,
    CreateEventComponent,
    EventParticipantsComponent,
    AddMicComponent,
    EditMicComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
