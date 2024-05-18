import {NgModule}                               from '@angular/core';
import {CommonModule}                           from '@angular/common';
import {RoutingModule}                          from './routing.module';
import {SharedModule}                           from '../shared-module';
import {CreateActionComponent}                  from './controllers/create-action.component';
import {LeftMenuModule}                         from '../left-menu/left-menu.module';
import {DisplayActionComponent}                 from './controllers/display-action.component';
import {ModalsModule}                           from '../modals/modals.module';
import {VoterTableComponent}                    from "./submodules/voter-table.component";
import {OnlineVotersComponent}                  from "./submodules/online-voters.component";
import {TicketHeaderComponent}                  from "./submodules/ticket-header.component";
import {VoterListComponent}                     from "./submodules/voter-list.component";
import {GameStateService}                       from "./service/game-state-service";
import {VoteService}                            from "./service/vote-service";
import {GameStateListenerFactory}               from "./factories/game-state-listener-factory";
import {VoteListenerFactory}                    from "./factories/vote-listener-factory";
import {SessionClosedListenerFactory}           from "./factories/session-closed-listener-factory";
import {SessionCreatedOrUpdatedListenerFactory} from "./factories/session-created-or-updated-listener-factory.service";
import {RoundStartListenerFactory}              from "./factories/round-start-listener-factory";
import {VoteNewJoinerListenerFactory}           from "./factories/vote-new-joiner-listener-factory";
import {PokerStartListenerFactory}              from "./factories/poker-start-listener-factory";
import {VoteStopListenerFactory}                from "./factories/vote-stop-listener-factory";
import {TicketCloseListenerFactory}             from "./factories/ticket-close-listener-factory";
import {PokerTicketDeleteListenerFactory}       from "./factories/poker-ticket-delete-listener-factory.service";
import {PokerTicketDeleteService}               from "./service/poker-ticket-delete-service";
import {VoteStopService}                        from "./service/vote-stop-service";
import {VoteNewJoinerService}                   from "./service/vote-new-joiner-service";
import {RoundStartService}                      from "./service/round-start-service";
import {SessionClosedService}                   from "./service/session-closed-service";
import {TicketCloseService}                     from "./service/ticket-close-service";
import {SessionCreatedOrUpdatedService}         from "./service/session-created-or-updated-service";

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
          VoterListComponent,
      ],
      providers:    [
          GameStateListenerFactory,
          GameStateService,
          VoteListenerFactory,
          VoteService,
          SessionClosedListenerFactory,
          SessionClosedService,
          SessionCreatedOrUpdatedListenerFactory,
          SessionCreatedOrUpdatedService,
          RoundStartListenerFactory,
          RoundStartService,
          VoteListenerFactory,
          VoteNewJoinerListenerFactory,
          VoteNewJoinerService,
          PokerStartListenerFactory,
          VoteStopListenerFactory,
          VoteStopService,
          TicketCloseListenerFactory,
          TicketCloseService,
          PokerTicketDeleteListenerFactory,
          PokerTicketDeleteService
      ]
  }
)
export class PokerModule
{
}
