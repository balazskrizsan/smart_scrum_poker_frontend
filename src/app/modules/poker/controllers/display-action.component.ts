import {
    Component,
    OnDestroy,
    OnInit
}                            from '@angular/core';
import {Forms}               from '../forms';
import {RxStompService}      from "../../commons/services/rx-stomp-service";
import {SocketDestination}   from "../../commons/enums/socket-destination";
import {ActivatedRoute}      from "@angular/router";
import {AccountService}      from "../../account/service/account-service";
import {IPokerState}         from "../interfaces/i-poker-state";
import {PokerStateStore}     from "../poker-state-store.service";
import {SubscriptionService} from "../service/subscription-service";

@Component({
    templateUrl: './../views/display.html',
    styleUrls:   [],
    providers:   [Forms],
})
export class DisplayActionComponent implements OnInit, OnDestroy
{
    protected state: IPokerState;

    public constructor(
      private pokerStateStore: PokerStateStore,
      private rxStompService: RxStompService,
      private activatedRoute: ActivatedRoute,
      private accountService: AccountService,
      private subscriptionService: SubscriptionService,
    )
    {
        this.state = pokerStateStore.state;

        this.pokerStateStore.state.pokerIdSecureFromParams = this.activatedRoute.snapshot.paramMap.get('secureId');

        subscriptionService.subscribe();
    }

    async ngOnInit(): Promise<void>
    {
        this.accountService.getCurrentUserOrRedirect();
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROOM_STATE
            .replace("{pokerIdSecure}", this.pokerStateStore.state.pokerIdSecureFromParams)
            .replace("{insecureUserId}", this.accountService.getCurrentUser().idSecure),
          ''
        );
    }

    async ngOnDestroy(): Promise<void>
    {
        this.subscriptionService.unsubscribe();
    }

    protected getFillPercent(): string
    {
        const percentage = (this.pokerStateStore.state.finishedTicketIds.length / this.pokerStateStore.state.tickets.length) * 100;

        return `${percentage}%`;
    }
}
