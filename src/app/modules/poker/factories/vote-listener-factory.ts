import {IVoteResponse}     from "../interfaces/i-vote-response";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {IPokerState}       from "../interfaces/i-poker-state";
import {Injectable}        from "@angular/core";
import {VoteService}       from "../service/vote-service";

@Injectable()
export class VoteListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private voteService: VoteService,
    )
    {
    }

    public create(state: IPokerState)
    {
        const voteListener = this.rxStompService.getSubscription<IVoteResponse>(
          `/queue/reply-${state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_VOTE
        );

        voteListener.$subscription = voteListener.observable.subscribe(
          (body) => this.voteService.setVote(body, state)
        );

        return voteListener;
    }
}
