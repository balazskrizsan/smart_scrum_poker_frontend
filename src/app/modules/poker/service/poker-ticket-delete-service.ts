import {IPokerState}           from "../interfaces/i-poker-state";
import {IStdApiResponse}       from "../../../interfaces/i-std-api-response";
import {ITicketDeleteResponse} from "../interfaces/i-ticket-delete-response";
import {Injectable}            from "@angular/core";

@Injectable()
export class PokerTicketDeleteService
{
    public setTicketDeleted(state: IPokerState, body: IStdApiResponse<ITicketDeleteResponse>)
    {
        state.tickets = state.tickets.filter(t => t.id !== body.data.deletedTicketId);
    }
}
