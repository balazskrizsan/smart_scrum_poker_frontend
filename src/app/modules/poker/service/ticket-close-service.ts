import {Injectable}        from "@angular/core";
import {IStdApiResponse}   from "../../../interfaces/i-std-api-response";
import {IVoteStopResponse} from "../interfaces/i-vote-stop-response";
import {PokerStateStore}   from "../poker-state-store.service";

@Injectable()
export class TicketCloseService
{
    constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public setTicketClose(body: IStdApiResponse<IVoteStopResponse>)
    {
        this.pokerStateStore.state.openedTicketId = 0;
    }
}
