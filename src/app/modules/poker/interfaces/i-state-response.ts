import {IPoker} from "./i-poker";
import {ITicket} from "./i-ticket";
import {IInsecureUser} from "../../account/interfaces/i-insecure-user";
import {IVotesWithVoteStat} from "./i-votes-with-vote-stat";

export interface IStateResponse
{
    poker: IPoker;
    tickets: Array<ITicket>;
    inGameInsecureUsers: Array<IInsecureUser>;
    inGameInsecureUsersWithSession: Array<IInsecureUser>;
    votes: Record<number, Record<string, IInsecureUser>>;
    votesWithVoteStatList: Record<number, IVotesWithVoteStat>;
    owner: IInsecureUser;
}
