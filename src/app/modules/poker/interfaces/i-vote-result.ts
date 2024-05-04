import {IVote} from "./i-vote";

export interface IVoteResult
{
    avg: number;
    min: number;
    max: number;
    votes: Record<string, IVote>;
}
