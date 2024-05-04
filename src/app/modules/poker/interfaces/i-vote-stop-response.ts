import {IVoteResult} from "./i-vote-result";

export interface IVoteStopResponse
{
    pokerIdSecure: string;
    finishedTicketId: string;
    voteResult: IVoteResult;
}
