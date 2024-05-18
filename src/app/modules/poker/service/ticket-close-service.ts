import {Injectable}        from "@angular/core";
import {IStdApiResponse}   from "../../../interfaces/i-std-api-response";
import {IVoteStopResponse} from "../interfaces/i-vote-stop-response";
import {IPokerState}       from "../interfaces/i-poker-state";

@Injectable()
export class TicketCloseService
{
    public setTicketClose(body: IStdApiResponse<IVoteStopResponse>, state: IPokerState)
    {
        state.openedTicketId = 0;
    }
}
