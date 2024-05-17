import {IVote} from "./i-vote";
import {IVoteStat} from "./i-vote-stat";

export interface IVoteResult
{
    voteStat: IVoteStat;
    votes: Record<string, IVote>;
}
