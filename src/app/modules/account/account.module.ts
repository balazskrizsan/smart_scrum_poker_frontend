import {NgModule}                      from '@angular/core';
import {CommonModule}                  from '@angular/common';
import {RoutingModule}                 from './routing.module';
import {SharedModule}                  from '../shared-module';
import {LeftMenuModule}                from '../left-menu/left-menu.module';
import {ModalsModule}                  from '../modals/modals.module';
import {InsecureCreateActionComponent} from "./actions/insecure-create-action.component";
import {LogoutComponent}               from "./actions/logout.component";

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
          InsecureCreateActionComponent,
          LogoutComponent,
      ],
  }
)
export class AccountModule
{
}
