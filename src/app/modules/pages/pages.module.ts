import {NgModule}               from '@angular/core';
import {CommonModule}           from '@angular/common';
import {SharedModule}           from '../shared-module';
import {LeftMenuModule}         from '../left-menu/left-menu.module';
import {ModalsModule}           from '../modals/modals.module';
import {RoadmapActionComponent} from "./actions/roadmap-action.component";
import {RoutingModule}          from "./routing.module";
import {ContactActionComponent} from "./actions/contact-action.component";
import {FaqActionComponent}     from "./actions/faq-action.component";
import {FutureActionComponent}  from "./actions/future-action.component";
import {PokerActionComponent}   from "./actions/poker-action.component";

@NgModule(
  {
      imports:      [
          CommonModule,
          RoutingModule,
          SharedModule,
          LeftMenuModule,
          ModalsModule,
      ],
      declarations: [
          RoadmapActionComponent,
          ContactActionComponent,
          FaqActionComponent,
          PokerActionComponent,
          FutureActionComponent,
      ],
  }
)
export class PagesModule
{
}
