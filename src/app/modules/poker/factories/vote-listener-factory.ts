import {IVoteResponse}     from "../interfaces/i-vote-response";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {Injectable}        from "@angular/core";
import {VoteService}       from "../service/vote-service";
import {PokerStateStore}   from "../poker-state-store.service";

@Injectable()
export class VoteListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private voteService: VoteService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create()
    {
        const voteListener = this.rxStompService.getSubscription<IVoteResponse>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_VOTE
        );

        voteListener.$subscription = voteListener.observable.subscribe(
          (body) => this.voteService.setVote(body)
        );

        return voteListener;
    }
}
