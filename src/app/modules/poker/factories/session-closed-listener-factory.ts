import {SocketDestination}    from "../../commons/enums/socket-destination";
import {RxStompService}       from "../../commons/services/rx-stomp-service";
import {IPokerState}          from "../interfaces/i-poker-state";
import {Injectable}           from "@angular/core";
import {ISessionResponse}     from "../interfaces/i-session-response";
import {SessionClosedService} from "../service/session-closed-service";

@Injectable()
export class SessionClosedListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private sessionClosedService: SessionClosedService,
    )
    {
    }

    public create(state: IPokerState)
    {
        const sessionClosedListener = this.rxStompService.getSubscription<ISessionResponse>(
          `/queue/reply-${state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_SESSION_CLOSED
        );

        sessionClosedListener.$subscription = sessionClosedListener.observable.subscribe(
          (body) => this.sessionClosedService.setSessionClosed(body, state)
        );

        return sessionClosedListener;
    }
}
