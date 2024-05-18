import {IInsecureUser} from "../../account/interfaces/i-insecure-user";
import {IPoker}        from "./i-poker";
import {IVote}     from "./i-vote";
import {IVoteStat} from "./i-vote-stat";
import {ITicket}       from "./i-ticket";

export interface IPokerState
{
    tickets: Array<ITicket>;
    pokerIdSecureFromParams: string;
    poker: IPoker;
    inGameInsecureUsers: Array<IInsecureUser>;
    inGameInsecureUsersWithSessions: Record<string, boolean>;
    owner: IInsecureUser;
    userVoteStats: Record<number, IVoteStat>;
    activeTicketId: number;
    openedTicketId: number;
    votes: Record<number, Record<string, IInsecureUser>>;
    userVotes: Record<number, Record<string, IVote>>;
    initDone: boolean;
    finishedTicketIds: Array<number>;
}
