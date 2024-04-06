import {IPoker} from "./i-poker";
import {ITicket} from "./i-ticket";
import {IInsecureUser} from "../../account/interfaces/i-insecure-user";

export interface IStateResponse
{
    poker: IPoker;
    tickets: Array<ITicket>;
    inGameInsecureUsers: Array<IInsecureUser>;
    votes: Record<number, Record<string, IInsecureUser>>;
    owner: IInsecureUser;
}