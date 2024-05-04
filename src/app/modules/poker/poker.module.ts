import {NgModule}               from '@angular/core';
import {CommonModule}           from '@angular/common';
import {RoutingModule}          from './routing.module';
import {SharedModule}           from '../shared-module';
import {CreateActionComponent}  from './controllers/create-action.component';
import {LeftMenuModule}         from '../left-menu/left-menu.module';
import {DisplayActionComponent} from './controllers/display-action.component';
import {ModalsModule}           from '../modals/modals.module';
import {VoterTableComponent}    from "./submodules/voter-table.component";
import {OnlineVotersComponent} from "./submodules/online-voters.component";
import {TicketHeaderComponent} from "./submodules/ticket-header.component";

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
          CreateActionComponent,
          DisplayActionComponent,
          VoterTableComponent,
          OnlineVotersComponent,
          TicketHeaderComponent,
      ],
  }
)
export class PokerModule
{
}
