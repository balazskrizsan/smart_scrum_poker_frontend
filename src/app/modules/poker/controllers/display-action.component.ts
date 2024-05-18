import {
    Component,
    OnDestroy,
    OnInit
}                                         from '@angular/core';
import {Forms}                            from '../forms';
import {RxStompService}                   from "../../commons/services/rx-stomp-service";
import {SocketDestination}                from "../../commons/enums/socket-destination";
import {ActivatedRoute}                   from "@angular/router";
import {IStateResponse}                   from "../interfaces/i-state-response";
import {IStartRound}                      from "../interfaces/i-start-round";
import {ISubscriptionListener}            from "../interfaces/i-subscription-listener";
import {IStartResponse}                   from "../interfaces/i-start-response";
import {IVoteResponse}                    from "../interfaces/i-vote-response";
import {AccountService}                   from "../../account/service/account-service";
import {IVoteStopResponse}                from "../interfaces/i-vote-stop-response";
import {IVoteNewJoinerResponse}           from "../interfaces/i-vote-new-joiner-response";
import {ISessionResponse}                 from "../interfaces/i-session-response";
import {IPokerState}                      from "../interfaces/i-poker-state";
import {ITicketDeleteResponse}            from "../interfaces/i-ticket-delete-response";
import {GameStateListenerFactory}         from "../factories/game-state-listener-factory";
import {VoteListenerFactory}              from "../factories/vote-listener-factory";
import {PokerStartListenerFactory}        from "../factories/poker-start-listener-factory";
import {SessionClosedListenerFactory}     from "../factories/session-closed-listener-factory";
import {RoundStartListenerFactory}        from "../factories/round-start-listener-factory";
import {VoteNewJoinerListenerFactory}     from "../factories/vote-new-joiner-listener-factory";
import {VoteStopListenerFactory}          from "../factories/vote-stop-listener-factory";
import {TicketCloseListenerFactory}       from "../factories/ticket-close-listener-factory";
import {PokerTicketDeleteListenerFactory} from "../factories/poker-ticket-delete-listener-factory.service";
import {PokerStateStore}                  from "../poker-state-store.service";

@Component({
    templateUrl: './../views/display.html',
    styleUrls:   [],
    providers:   [Forms],
})
export class DisplayActionComponent implements OnInit, OnDestroy
{
    protected state: IPokerState;
    private readonly gameStateListener: ISubscriptionListener<IStateResponse>;
    private readonly pokerStartListener: ISubscriptionListener<IStartResponse>;
    private readonly voteListener: ISubscriptionListener<IVoteResponse>;
    private readonly sessionClosedListener: ISubscriptionListener<ISessionResponse>;
    private readonly sessionCreatedOrUpdatedListener: ISubscriptionListener<ISessionResponse>;
    private readonly roundStartListener: ISubscriptionListener<IStartRound>;
    private readonly voteNewJoinerListener: ISubscriptionListener<IVoteNewJoinerResponse>;
    private readonly voteStopListener: ISubscriptionListener<IVoteStopResponse>;
    private readonly ticketCloseListener: ISubscriptionListener<IVoteStopResponse>;
    private readonly ticketDeleteListener: ISubscriptionListener<ITicketDeleteResponse>;

    public constructor(
      private pokerStateStore: PokerStateStore,
      private rxStompService: RxStompService,
      private activatedRoute: ActivatedRoute,
      private accountService: AccountService,
      private gameStateListenerFactory: GameStateListenerFactory,
      private voteListenerFactory: VoteListenerFactory,
      private pokerStartListenerFactory: PokerStartListenerFactory,
      private sessionClosedListenerFactory: SessionClosedListenerFactory,
      private roundStartListenerFactory: RoundStartListenerFactory,
      private voteNewJoinerListenerFactory: VoteNewJoinerListenerFactory,
      private voteStopListenerFactory: VoteStopListenerFactory,
      private ticketCloseListenerFactory: TicketCloseListenerFactory,
      private ticketDeleteListenerFactory: PokerTicketDeleteListenerFactory,
    )
    {
        this.state = pokerStateStore.state;

        this.pokerStateStore.state.pokerIdSecureFromParams = this.activatedRoute.snapshot.paramMap.get('secureId');

        this.gameStateListener = this.gameStateListenerFactory.create();
        this.pokerStartListener = this.pokerStartListenerFactory.create();
        this.voteListener = this.voteListenerFactory.create();
        this.sessionClosedListener = this.sessionClosedListenerFactory.create();
        this.sessionCreatedOrUpdatedListener = this.sessionClosedListenerFactory.create();
        this.roundStartListener = this.roundStartListenerFactory.create();
        this.voteNewJoinerListener = this.voteNewJoinerListenerFactory.create();
        this.voteStopListener = this.voteStopListenerFactory.create();
        this.ticketCloseListener = this.ticketCloseListenerFactory.create();
        this.ticketDeleteListener = this.ticketDeleteListenerFactory.create();
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
        this.rxStompService.unsubscribe(this.gameStateListener);
        this.rxStompService.unsubscribe(this.pokerStartListener);
        this.rxStompService.unsubscribe(this.voteListener);
        this.rxStompService.unsubscribe(this.sessionClosedListener);
        this.rxStompService.unsubscribe(this.sessionCreatedOrUpdatedListener);
        this.rxStompService.unsubscribe(this.roundStartListener);
        this.rxStompService.unsubscribe(this.voteNewJoinerListener);
        this.rxStompService.unsubscribe(this.voteStopListener);
        this.rxStompService.unsubscribe(this.ticketCloseListener);
        this.rxStompService.unsubscribe(this.ticketDeleteListener);
    }

    protected getFillPercent(): string
    {
        const percentage = (this.pokerStateStore.state.finishedTicketIds.length / this.pokerStateStore.state.tickets.length) * 100;

        return `${percentage}%`;
    }
}
