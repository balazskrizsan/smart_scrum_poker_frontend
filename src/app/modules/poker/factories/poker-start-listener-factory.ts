import {Injectable}        from "@angular/core";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {IPokerState}       from "../interfaces/i-poker-state";
import {IStartResponse}    from "../interfaces/i-start-response";

@Injectable()
export class PokerStartListenerFactory
{
    public constructor(private rxStompService: RxStompService)
    {
    }

    public create(state: IPokerState)
    {
        const pokerStartListener = this.rxStompService.getSubscription<IStartResponse>(
          `/queue/reply-${state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_START
        );

        pokerStartListener.$subscription = pokerStartListener.observable.subscribe();

        return pokerStartListener;
    }
}
