import {IVote}     from "./i-vote";
import {IVoteStat} from "./i-vote-stat";

export interface IVotesWithVoteStat {
    votes: Record<string, IVote>;
    voteStat: Record<string, IVoteStat>;
}
