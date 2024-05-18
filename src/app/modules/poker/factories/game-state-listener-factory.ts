import {Injectable}        from "@angular/core";
import {IStateResponse}    from "../interfaces/i-state-response";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {GameStateService}  from "../service/game-state-service";

@Injectable()
export class GameStateListenerFactory
{
    public constructor(
      private rxStompService: RxStompService,
      private gameStateService: GameStateService,
    )
    {
    }

    public create()
    {
        const listener = this.rxStompService.getSubscription<IStateResponse>(
          '/user/queue/reply',
          SocketDestination.RECEIVE_POKER_ROOM_STATE
        );

        listener.$subscription = listener.observable.subscribe(
          (body) => this.gameStateService.setGametState(body)
        );

        return listener;
    }
}
