import {Injectable}             from "@angular/core";
import {SocketDestination}      from "../../commons/enums/socket-destination";
import {RxStompService}         from "../../commons/services/rx-stomp-service";
import {IPokerState}            from "../interfaces/i-poker-state";
import {IVoteNewJoinerResponse} from "../interfaces/i-vote-new-joiner-response";
import {VoteNewJoinerService}   from "../service/vote-new-joiner-service";

@Injectable()
export class VoteNewJoinerListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private voteNewJoinerService: VoteNewJoinerService,
    )
    {
    }

    public create(state: IPokerState)
    {
        const voteNewJoinerListener = this.rxStompService
          .getSubscription<IVoteNewJoinerResponse>(
            `/queue/reply-${state.pokerIdSecureFromParams}`,
            SocketDestination.RECEIVE_POKER_VOTE_NEW_JOINER
          );

        voteNewJoinerListener.$subscription = voteNewJoinerListener.observable.subscribe(
          (body) => this.voteNewJoinerService.setVoteNewJoiner(body, state)
        );

        return voteNewJoinerListener;
    }
}