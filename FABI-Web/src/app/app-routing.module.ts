import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { AdminModule} from './Admin/admin.module';
import { AdminDashboardComponent } from "./Admin/admin-dashboard/admin-dashboard.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sample-form', component: SampleFormComponent},
  {path: '', component: LoginComponent},
  {path: 'Admin', component: AdminModule,
    children :[
      { path: 'admin-dashboard', component: AdminDashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
