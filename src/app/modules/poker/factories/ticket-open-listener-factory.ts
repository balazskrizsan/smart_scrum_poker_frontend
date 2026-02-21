import {Injectable}            from "@angular/core";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {TicketOpenService}     from "../service/ticket-open-service";
import {PokerStateStore}       from "../poker-state-store.service";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";
import {ITickerOpenResponse}   from "../interfaces/i-ticker-open-response";

@Injectable()
export class TicketOpenListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private ticketOpenService: TicketOpenService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create(): ISubscriptionListener<ITickerOpenResponse>
    {
        const ticketOpenListener = this.rxStompService.getSubscription<ITickerOpenResponse>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE__POKER__TICKET_OPEN
        );

        ticketOpenListener.$subscription = ticketOpenListener.observable.subscribe(
          (body) => this.ticketOpenService.setTicketOpen(body)
        );

        return ticketOpenListener;
    }
}
