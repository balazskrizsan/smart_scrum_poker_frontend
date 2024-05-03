import {NgModule}              from '@angular/core';
import {
    RouterModule,
    Routes
}                              from '@angular/router';
import {ReactiveFormsModule}           from '@angular/forms';
import {InsecureCreateActionComponent} from "./actions/insecure-create-action.component";
import {LogoutComponent} from "./actions/logout.component";

const routes: Routes = [
    {path: '', component: InsecureCreateActionComponent},
    {path: 'login', component: InsecureCreateActionComponent},
    {path: 'logout', component: LogoutComponent},
];

@NgModule(
  {
      imports: [ReactiveFormsModule, RouterModule.forChild(routes)],
      exports: [ReactiveFormsModule, RouterModule]
  }
)
export class RoutingModule
{
}
