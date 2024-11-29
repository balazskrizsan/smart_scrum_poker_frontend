import {Injectable}            from "@angular/core";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {IStartResponse}        from "../interfaces/i-start-response";
import {PokerStateStore}       from "../poker-state-store.service";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";

@Injectable()
export class PokerStartListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create(): ISubscriptionListener<IStartResponse>
    {
        const pokerStartListener = this.rxStompService.getSubscription<IStartResponse>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_START
        );

        pokerStartListener.$subscription = pokerStartListener.observable.subscribe();

        return pokerStartListener;
    }
}
