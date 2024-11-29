import {Injectable}            from "@angular/core";
import {IVoteStopResponse}     from "../interfaces/i-vote-stop-response";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {TicketCloseService}    from "../service/ticket-close-service";
import {PokerStateStore}       from "../poker-state-store.service";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";

@Injectable()
export class TicketCloseListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private ticketCloseService: TicketCloseService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create(): ISubscriptionListener<IVoteStopResponse>
    {
        const ticketCloseListener = this.rxStompService.getSubscription<IVoteStopResponse>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_TICKET_CLOSE
        );

        ticketCloseListener.$subscription = ticketCloseListener.observable.subscribe(
          (body) => this.ticketCloseService.setTicketClose(body)
        );

        return ticketCloseListener;
    }
}
