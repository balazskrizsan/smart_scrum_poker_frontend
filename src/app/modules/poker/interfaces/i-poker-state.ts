import {IInsecureUser} from "../../account/interfaces/i-insecure-user";
import {IPoker}        from "./i-poker";
import {IVote}         from "./i-vote";

export interface IPokerState
{
    pokerIdSecureFromParams: string;
    poker: IPoker;
    inGameInsecureUsers: Array<IInsecureUser>;
    inGameInsecureUsersWithSessions: Record<string, boolean>;
    owner: IInsecureUser;
    userVoteAvgs: Record<number, number>;
    userVoteMins: Record<number, number>;
    userVoteMaxs: Record<number, number>;
    activeTicketId: number;
    openedTicketId: number;
    votes: Record<number, Record<string, IInsecureUser>>;
    userVotes: Record<number, Record<string, IVote>>;
    initDone: boolean;
    finishedTicketIds: Array<number>;
}
