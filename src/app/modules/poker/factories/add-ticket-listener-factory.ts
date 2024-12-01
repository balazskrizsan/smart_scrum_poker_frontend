import {Injectable}            from "@angular/core";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {PokerStateStore}       from "../poker-state-store.service";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";
import {IAddTicketResponse}    from "../interfaces/i-add-ticket-response";
import {AddTicketService}      from "../service/add-ticket-service";

@Injectable()
export class AddTicketListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private addTicketService: AddTicketService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create(): ISubscriptionListener<IAddTicketResponse>
    {
        const listener = this.rxStompService.getSubscription<IAddTicketResponse>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE__POKER__NEW_TICKET_CREATE
        );

        listener.$subscription = listener.observable.subscribe(
          (body) => this.addTicketService.add(body)
        );

        return listener;
    }
}
