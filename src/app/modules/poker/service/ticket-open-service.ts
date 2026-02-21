import {Injectable}          from "@angular/core";
import {IStdApiResponse}     from "../../../interfaces/i-std-api-response";
import {PokerStateStore}     from "../poker-state-store.service";
import {ITickerOpenResponse} from "../interfaces/i-ticker-open-response";

@Injectable()
export class TicketOpenService
{
    constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public setTicketOpen(body: IStdApiResponse<ITickerOpenResponse>)
    {
        this.pokerStateStore.setOpenedTicketId(parseInt(body.data.openedTicketId));
    }
}
