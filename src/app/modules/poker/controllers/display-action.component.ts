import {
    Component,
    OnDestroy,
    OnInit
}                              from '@angular/core';
import {Forms}                 from '../forms';
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {ActivatedRoute}        from "@angular/router";
import {AccountService}        from "../../account/service/account-service";
import {PokerStateStore}       from "../poker-state-store.service";
import {SubscriptionService}   from "../service/subscription-service";
import {environment}           from '../../../../environments/environment';
import {CommonModule}          from "@angular/common";
import {TicketHeaderComponent} from "../submodules/ticket-header.component";
import {AddTicketComponent}    from "../submodules/add-ticket.component";
import {OnlineVotersComponent} from "../submodules/online-voters.component";
import {VoterListComponent}    from "../submodules/voter-list.component";
import {VoterTableComponent}   from "../submodules/voter-table.component";
import {FlashMessageService}   from "../../flash-message/services/flash-message-service";
import {FlashMessageLevelEnum} from "../../flash-message/enums/flash-message-level-enum";

@Component({
    templateUrl: './../views/display.html',
    styleUrls:   ['./../views/display.scss'],
    standalone:  true,
    imports:     [
        CommonModule,
        TicketHeaderComponent,
        AddTicketComponent,
        OnlineVotersComponent,
        VoterListComponent,
        VoterTableComponent,
    ],
    providers:   [Forms],
})
export class DisplayActionComponent implements OnInit, OnDestroy
{
    protected state$ = this.pokerStateStore.state$;
    protected appHost = environment.frontend.host;

    public constructor(
      private pokerStateStore: PokerStateStore,
      private rxStompService: RxStompService,
      private activatedRoute: ActivatedRoute,
      public accountService: AccountService,
      private subscriptionService: SubscriptionService,
      private flashMessageService: FlashMessageService,
    )
    {
        this.pokerStateStore.updateState({
            pokerIdSecureFromParams: this.activatedRoute.snapshot.paramMap.get('secureId')
        });

        subscriptionService.subscribe();
    }

    protected copyShareLink(): void
    {
        const currentState = this.pokerStateStore.state;
        const shareUrl = `${this.appHost}poker/display/${currentState.pokerIdSecureFromParams}`;
        navigator.clipboard.writeText(shareUrl).then(() =>
        {
            this.flashMessageService.push({
                messageLevel: FlashMessageLevelEnum.OK,
                message:      'Share link copied to clipboard'
            });
        }).catch(err =>
        {
            this.flashMessageService.push({
                messageLevel: FlashMessageLevelEnum.OK,
                message:      'Share link copy failed'
            });
        });
    }

    async ngOnInit(): Promise<void>
    {
        this.accountService.getCurrentUserOrRedirect();

        const currentState = this.pokerStateStore.state;
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROOM_STATE
            .replace("{pokerIdSecure}", currentState.pokerIdSecureFromParams)
            .replace("{insecureUserId}", this.accountService.getCurrentUser().idSecure),
          ''
        );
    }

    async ngOnDestroy(): Promise<void>
    {
        this.subscriptionService.unsubscribe();
    }
}
