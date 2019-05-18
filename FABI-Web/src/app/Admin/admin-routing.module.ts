import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { StaffHandlerComponent } from './staff-handler/staff-handler.component';
import { OrganizationHandlerComponent } from './organization-handler/organization-handler.component';
import { ClinicHandlerComponent } from './clinic-handler/clinic-handler.component';
import { DatabaseHandlerComponent } from './database-handler/database-handler.component';


const routes: Routes = [
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'staff-handler', component: StaffHandlerComponent},
  {path: 'organization-handler', component: OrganizationHandlerComponent},
  {path: 'clinic-handler', component: ClinicHandlerComponent},
  {path: 'database-handler', component: DatabaseHandlerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
