import {NgModule}              from '@angular/core';
import {
    RouterModule,
    Routes
}                              from '@angular/router';
import {ReactiveFormsModule}           from '@angular/forms';
import {InsecureCreateActionComponent} from "./actions/insecure-create-action.component";

const routes: Routes = [
    {path: '', component: InsecureCreateActionComponent},
    {path: 'login', component: InsecureCreateActionComponent},
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
