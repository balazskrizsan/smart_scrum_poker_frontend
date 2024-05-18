import {IStdApiResponse}   from "../../../interfaces/i-std-api-response";
import {IPokerState}       from "../interfaces/i-poker-state";
import {Injectable}        from "@angular/core";
import {IVoteStopResponse} from "../interfaces/i-vote-stop-response";

@Injectable()
export class VoteStopService
{
    public constructor()
    {
    }

    public setVoteStop(body: IStdApiResponse<IVoteStopResponse>, state: IPokerState)
    {
        state.finishedTicketIds.push(Number(body.data.finishedTicketId));
        state.userVotes[body.data.finishedTicketId] = body.data.voteResult.votes;
        state.userVoteStats[body.data.finishedTicketId] = body.data.voteResult.voteStat;
        state.activeTicketId = 0;
    }
}
