import {Injectable}      from "@angular/core";
import {IStdApiResponse} from "../../../interfaces/i-std-api-response";
import {IStartRound}     from "../interfaces/i-start-round";
import {IPokerState}     from "../interfaces/i-poker-state";

@Injectable()
export class RoundStartService
{
    public setRoundStart(body: IStdApiResponse<IStartRound>, state: IPokerState)
    {
        state.activeTicketId = body.data.startedTicketId;
        state.openedTicketId = body.data.startedTicketId;
    }
}
