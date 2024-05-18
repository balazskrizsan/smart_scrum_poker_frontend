import {Injectable}        from "@angular/core";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {IPokerState}       from "../interfaces/i-poker-state";
import {IStartRound}       from "../interfaces/i-start-round";
import {RoundStartService} from "../service/round-start-service";

@Injectable()
export class RoundStartListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private roundStartService: RoundStartService,
    )
    {
    }

    public create(state: IPokerState)
    {
        const roundStartListener = this.rxStompService.getSubscription<IStartRound>(
          `/queue/reply-${state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_VOTE_START
        );

        roundStartListener.$subscription = roundStartListener.observable.subscribe(
          (body) => this.roundStartService.setRoundStart(body, state)
        );

        return roundStartListener;
    }
}
