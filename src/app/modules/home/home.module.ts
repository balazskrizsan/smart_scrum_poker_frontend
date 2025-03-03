import {NgModule}                      from '@angular/core';
import {CommonModule}                  from '@angular/common';
import {SharedModule}                  from '../shared-module';
import {LeftMenuModule}                from '../left-menu/left-menu.module';
import {ModalsModule}                  from '../modals/modals.module';
import {IndexActionComponent}          from "./actions/index-action.component";
import {RoutingModule}                 from "./routing.module";

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
          IndexActionComponent
      ],
  }
)
export class HomeModule
{
}
