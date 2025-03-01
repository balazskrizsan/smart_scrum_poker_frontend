import {Injectable}            from "@angular/core";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {PokerStateStore}       from "../poker-state-store.service";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";
import {VoterLeavingService}   from "../service/voter-leaving-service";
import {IVoterLeavingResponse} from "../interfaces/i-voter-leaving-response";
import {SocketDestination}     from "../../commons/enums/socket-destination";

@Injectable()
export class VoterLeavingFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private voterLeavingService: VoterLeavingService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create(): ISubscriptionListener<IVoterLeavingResponse>
    {
        const listener = this.rxStompService.getSubscription<IVoterLeavingResponse>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE__POKER__VOTER_LEAVING
        );

        listener.$subscription = listener.observable.subscribe(
          (body) => this.voterLeavingService.leave(body)
        );

        return listener;
    }
}
