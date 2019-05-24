import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberViewSamplesComponent } from './member-view-samples/member-view-samples.component';
import { MemberSubmitSampleComponent } from './member-submit-sample/member-submit-sample.component';


const routes: Routes = [
  {path: 'member-dashboard', component: MemberDashboardComponent},
  {path: 'member-profile', component: MemberProfileComponent},
  {path: 'member-view-samples', component: MemberViewSamplesComponent},
  {path: 'member-submit-sample', component: MemberSubmitSampleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationMemberRoutingModule { }
