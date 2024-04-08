import {IVote} from "./i-vote";

export interface IVoteStopResponse {
    pokerIdSecure: string;
    finishedTicketId: string;
    votes: Record<string, IVote>;
}
