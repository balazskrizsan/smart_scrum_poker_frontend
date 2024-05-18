import {Injectable}        from "@angular/core";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {IPokerState}       from "../interfaces/i-poker-state";
import {IVoteStopResponse} from "../interfaces/i-vote-stop-response";
import {VoteStopService}   from "../service/vote-stop-service";

@Injectable()
export class VoteStopListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private voteStopService: VoteStopService,
    )
    {
    }

    public create(state: IPokerState)
    {
        const voteStopListener = this.rxStompService.getSubscription<IVoteStopResponse>(
          `/queue/reply-${state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_VOTE_STOP
        );

        voteStopListener.$subscription = voteStopListener.observable.subscribe(
          (body) => this.voteStopService.setVoteStop(body, state)
        );

        return voteStopListener;
    }
}