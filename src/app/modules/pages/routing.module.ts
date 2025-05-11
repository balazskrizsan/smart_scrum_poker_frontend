import {NgModule}               from '@angular/core';
import {
    RouterModule,
    Routes
}                               from '@angular/router';
import {ReactiveFormsModule}    from '@angular/forms';
import {RoadmapActionComponent} from "./actions/roadmap-action.component";
import {ContactActionComponent} from "./actions/contact-action.component";
import {FaqActionComponent}     from "./actions/faq-action.component";
import {FutureActionComponent}  from "./actions/future-action.component";
import {PokerActionComponent}   from "./actions/poker-action.component";

const routes: Routes = [
    {path: 'roadmap', component: RoadmapActionComponent},
    {path: 'contact', component: ContactActionComponent},
    {path: 'faq', component: FaqActionComponent},
    {path: 'poker', component: PokerActionComponent},
    {path: 'future', component: FutureActionComponent},
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
