import {IStdApiResponse}       from "../../../interfaces/i-std-api-response";
import {ITicketDeleteResponse} from "../interfaces/i-ticket-delete-response";
import {Injectable}            from "@angular/core";
import {PokerStateStore}       from "../poker-state-store.service";

@Injectable()
export class PokerTicketDeleteService
{
    constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public setTicketDeleted(body: IStdApiResponse<ITicketDeleteResponse>)
    {
        const state = this.pokerStateStore.state;

        state.tickets = state.tickets.filter(t => t.id !== body.data.deletedTicketId);
    }
}
