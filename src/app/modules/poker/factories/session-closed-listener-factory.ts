import {SocketDestination}    from "../../commons/enums/socket-destination";
import {RxStompService}       from "../../commons/services/rx-stomp-service";
import {Injectable}           from "@angular/core";
import {ISessionResponse}     from "../interfaces/i-session-response";
import {SessionClosedService} from "../service/session-closed-service";
import {PokerStateStore}      from "../poker-state-store.service";

@Injectable()
export class SessionClosedListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private sessionClosedService: SessionClosedService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create()
    {
        const sessionClosedListener = this.rxStompService.getSubscription<ISessionResponse>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_SESSION_CLOSED
        );

        sessionClosedListener.$subscription = sessionClosedListener.observable.subscribe(
          (body) => this.sessionClosedService.setSessionClosed(body)
        );

        return sessionClosedListener;
    }
}
