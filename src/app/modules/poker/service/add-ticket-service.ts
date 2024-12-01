import {IStdApiResponse}    from "../../../interfaces/i-std-api-response";
import {Injectable}         from "@angular/core";
import {PokerStateStore}    from "../poker-state-store.service";
import {IAddTicketResponse} from "../interfaces/i-add-ticket-response";

@Injectable()
export class AddTicketService
{
    public constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public add(body: IStdApiResponse<IAddTicketResponse>)
    {
        const state = this.pokerStateStore.state;

        state.tickets.push(body.data.ticket);
    }
}
