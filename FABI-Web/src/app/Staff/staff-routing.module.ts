import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';

import { SampleFormComponent } from '../sample-form/sample-form.component';

import { SubmitCbsRequestComponent } from './submit-cbs-request/submit-cbs-request.component';
import { SubmitCbsDepositComponent } from './submit-cbs-deposit/submit-cbs-deposit.component';

import { SubmitCmwRequestComponent } from './submit-cmw-request/submit-cmw-request.component';
import { SubmitCmwDepositComponent } from './submit-cmw-deposit/submit-cmw-deposit.component';
import { SubmitCmwRevitalizationComponent } from './submit-cmw-revitalization/submit-cmw-revitalization.component';

const routes: Routes = [
  {path: 'staff-dashboard', component: StaffDashboardComponent},
  {path: 'submit-sample', component: SampleFormComponent},
  {path: 'submit-cbs-request', component: SubmitCbsRequestComponent},
  {path: 'submit-cbs-deposit', component: SubmitCbsDepositComponent},
  {path: 'submit-cmw-request', component: SubmitCmwRequestComponent},
  {path: 'submit-cmw-deposit', component: SubmitCmwDepositComponent},
  {path: 'submit-cmw-revitalization', component: SubmitCmwRevitalizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
