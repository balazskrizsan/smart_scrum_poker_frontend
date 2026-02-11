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
        this.pokerStateStore.removeTicket(body.data.deletedTicketId);
    }
}
