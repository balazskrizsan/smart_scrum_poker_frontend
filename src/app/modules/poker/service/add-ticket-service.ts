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
        this.pokerStateStore.addTicket(body.data.ticket);
    }
}
