import {NgModule}             from '@angular/core';
import {
    RouterModule,
    Routes
}                             from '@angular/router';
import {ReactiveFormsModule}  from '@angular/forms';
import {IndexActionComponent} from "./actions/index-action.component";

const routes: Routes = [
    {path: '', component: IndexActionComponent},
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
