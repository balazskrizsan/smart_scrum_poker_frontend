import {Injectable}      from "@angular/core";
import {IStdApiResponse} from "../../../interfaces/i-std-api-response";
import {IStartRound}     from "../interfaces/i-start-round";
import {PokerStateStore} from "../poker-state-store.service";

@Injectable()
export class RoundStartService
{
    public constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public setRoundStart(body: IStdApiResponse<IStartRound>)
    {
        this.pokerStateStore.state.activeTicketId = body.data.startedTicketId;
        this.pokerStateStore.state.openedTicketId = body.data.startedTicketId;
    }
}
