import {Injectable}               from "@angular/core";
import {SocketDestination}        from "../../commons/enums/socket-destination";
import {RxStompService}           from "../../commons/services/rx-stomp-service";
import {ITicketDeleteResponse}    from "../interfaces/i-ticket-delete-response";
import {PokerTicketDeleteService} from "../service/poker-ticket-delete-service";
import {PokerStateStore}          from "../poker-state-store.service";

@Injectable()
export class PokerTicketDeleteListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private pokerTicketDeleteService: PokerTicketDeleteService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create()
    {
        const ticketDeleteListener = this.rxStompService
          .getSubscription<ITicketDeleteResponse>(
            `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
            SocketDestination.RECEIVE_POKER_TICKET_DELETE
          );

        ticketDeleteListener.$subscription = ticketDeleteListener.observable.subscribe(
          (body) => this.pokerTicketDeleteService.setTicketDeleted(body)
        );

        return ticketDeleteListener;
    }
}
