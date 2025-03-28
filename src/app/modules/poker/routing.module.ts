import {NgModule}              from '@angular/core';
import {
    RouterModule,
    Routes
}                              from '@angular/router';
import {ReactiveFormsModule}   from '@angular/forms';
import {CreateActionComponent} from './controllers/create-action.component';
import {DisplayActionComponent} from "./controllers/display-action.component";
import {MyPokersActionComponent} from "./controllers/my-pokers-action.component";

const routes: Routes = [
    {path: '', component: CreateActionComponent},
    {path: 'create', component: CreateActionComponent},
    {path: 'my-pokers', component: MyPokersActionComponent},
    {path: 'display/:secureId', component: DisplayActionComponent},
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
