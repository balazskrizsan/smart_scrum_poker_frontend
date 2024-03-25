import {IPoker} from "./i-poker";
import {ITicket} from "./i-ticket";

export interface IStateResponse
{
    poker: IPoker;
    tickets: Array<ITicket>;
}