import {Injectable}            from "@angular/core";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {IVoteStopResponse}     from "../interfaces/i-vote-stop-response";
import {VoteStopService}       from "../service/vote-stop-service";
import {PokerStateStore}       from "../poker-state-store.service";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";

@Injectable()
export class VoteStopListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private voteStopService: VoteStopService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create(): ISubscriptionListener<IVoteStopResponse>
    {
        const voteStopListener = this.rxStompService.getSubscription<IVoteStopResponse>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_VOTE_STOP
        );

        voteStopListener.$subscription = voteStopListener.observable.subscribe(
          (body) => this.voteStopService.setVoteStop(body)
        );

        return voteStopListener;
    }
}