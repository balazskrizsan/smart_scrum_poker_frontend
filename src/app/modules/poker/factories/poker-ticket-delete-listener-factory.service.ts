import {Injectable}               from "@angular/core";
import {SocketDestination}        from "../../commons/enums/socket-destination";
import {RxStompService}           from "../../commons/services/rx-stomp-service";
import {IPokerState}              from "../interfaces/i-poker-state";
import {ITicketDeleteResponse}    from "../interfaces/i-ticket-delete-response";
import {PokerTicketDeleteService} from "../service/poker-ticket-delete-service";

@Injectable()
export class PokerTicketDeleteListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private pokerTicketDeleteService: PokerTicketDeleteService
    )
    {
    }

    public create(state: IPokerState)
    {
        const ticketDeleteListener = this.rxStompService
          .getSubscription<ITicketDeleteResponse>(
            `/queue/reply-${state.pokerIdSecureFromParams}`,
            SocketDestination.RECEIVE_POKER_TICKET_DELETE
          );

        ticketDeleteListener.$subscription = ticketDeleteListener.observable.subscribe(
          (body) => this.pokerTicketDeleteService.setTicketDeleted(state, body)
        );

        return ticketDeleteListener;
    }
}
