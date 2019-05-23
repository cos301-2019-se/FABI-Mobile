import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClinicHandlerComponent } from './clinic-handler/clinic-handler.component';
import { DatabaseHandlerComponent } from './database-handler/database-handler.component';
import { OrganizationHandlerComponent } from './organization-handler/organization-handler.component';
import { StaffHandlerComponent } from './staff-handler/staff-handler.component';


@NgModule({
  declarations: [AdminDashboardComponent, ClinicHandlerComponent, DatabaseHandlerComponent, OrganizationHandlerComponent, StaffHandlerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
