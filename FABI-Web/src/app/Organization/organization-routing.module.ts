import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
// import { MemberHandlerComponent } from './member-handler/member-handler.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { OrganizationViewSamplesComponent } from './organization-view-samples/organization-view-samples.component';
import { OrganizationSubmitSampleComponent } from './organization-submit-sample/organization-submit-sample.component';

const routes: Routes = [
  {path: 'organization-dashboard', component: OrganizationDashboardComponent},
  // {path: 'member-handler', component: MemberHandlerComponent},
  {path: 'organization-profile', component: OrganizationProfileComponent},
  {path: 'organization-view-samples', component: OrganizationViewSamplesComponent},
  {path: 'organization-submit-sample', component: OrganizationSubmitSampleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
