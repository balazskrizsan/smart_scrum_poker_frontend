import {SocketDestination}              from "../../commons/enums/socket-destination";
import {RxStompService}                 from "../../commons/services/rx-stomp-service";
import {IPokerState}                    from "../interfaces/i-poker-state";
import {Injectable}                     from "@angular/core";
import {ISessionResponse}               from "../interfaces/i-session-response";
import {SessionCreatedOrUpdatedService} from "../service/session-created-or-updated-service";

@Injectable()
export class SessionCreatedOrUpdatedListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private sessionCreatedOrUpdatedService: SessionCreatedOrUpdatedService,
    )
    {
    }

    public create(state: IPokerState)
    {
        const sessionCreatedOrUpdatedListener = this.rxStompService
          .getSubscription<ISessionResponse>(
            `/queue/reply-${state.pokerIdSecureFromParams}`,
            SocketDestination.RECEIVE_SESSION_CREATED_OR_UPDATED
          );

        sessionCreatedOrUpdatedListener.$subscription = sessionCreatedOrUpdatedListener.observable.subscribe(
          (body) => this.sessionCreatedOrUpdatedService
            .setSessionCreatedOrUpdatedService(body, state)
        );

        return sessionCreatedOrUpdatedListener;
    }
}
