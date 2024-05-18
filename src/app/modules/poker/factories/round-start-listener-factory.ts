import {Injectable}        from "@angular/core";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {IStartRound}       from "../interfaces/i-start-round";
import {RoundStartService} from "../service/round-start-service";
import {PokerStateStore}   from "../poker-state-store.service";

@Injectable()
export class RoundStartListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private roundStartService: RoundStartService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public create()
    {
        const roundStartListener = this.rxStompService.getSubscription<IStartRound>(
          `/queue/reply-${this.pokerStateStore.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_VOTE_START
        );

        roundStartListener.$subscription = roundStartListener.observable.subscribe(
          (body) => this.roundStartService.setRoundStart(body)
        );

        return roundStartListener;
    }
}
