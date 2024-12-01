import {Injectable}                       from "@angular/core";
import {GameStateListenerFactory}         from "../factories/game-state-listener-factory";
import {VoteListenerFactory}              from "../factories/vote-listener-factory";
import {PokerStartListenerFactory}        from "../factories/poker-start-listener-factory";
import {SessionClosedListenerFactory}     from "../factories/session-closed-listener-factory";
import {RoundStartListenerFactory}        from "../factories/round-start-listener-factory";
import {VoteNewJoinerListenerFactory}     from "../factories/vote-new-joiner-listener-factory";
import {VoteStopListenerFactory}          from "../factories/vote-stop-listener-factory";
import {TicketCloseListenerFactory}       from "../factories/ticket-close-listener-factory";
import {PokerTicketDeleteListenerFactory} from "../factories/poker-ticket-delete-listener-factory.service";
import {ISubscriptionListener}            from "../interfaces/i-subscription-listener";
import {RxStompService}                   from "../../commons/services/rx-stomp-service";

@Injectable()
export class SubscriptionService
{
    private readonly listeners: ISubscriptionListener<any>[] = [];

    public constructor(
      private rxStompService: RxStompService,
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
    }

    public subscribe()
    {
        this.listeners.push(this.gameStateListenerFactory.create());
        this.listeners.push(this.pokerStartListenerFactory.create());
        this.listeners.push(this.voteListenerFactory.create());
        this.listeners.push(this.sessionClosedListenerFactory.create());
        this.listeners.push(this.sessionClosedListenerFactory.create());
        this.listeners.push(this.roundStartListenerFactory.create());
        this.listeners.push(this.voteNewJoinerListenerFactory.create());
        this.listeners.push(this.voteStopListenerFactory.create());
        this.listeners.push(this.ticketCloseListenerFactory.create());
        this.listeners.push(this.ticketDeleteListenerFactory.create());
    }

    public unsubscribe()
    {
        this.listeners.map(l => this.rxStompService.unsubscribe(l));
    }
}
