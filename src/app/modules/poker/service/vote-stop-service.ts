import {IStdApiResponse}   from "../../../interfaces/i-std-api-response";
import {Injectable}        from "@angular/core";
import {IVoteStopResponse} from "../interfaces/i-vote-stop-response";
import {PokerStateStore}   from "../poker-state-store.service";

@Injectable()
export class VoteStopService
{
    public constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public setVoteStop(body: IStdApiResponse<IVoteStopResponse>)
    {
        const state = this.pokerStateStore.state;

        state.finishedTicketIds.push(Number(body.data.finishedTicketId));
        state.userVotes[body.data.finishedTicketId] = body.data.voteResult.votes;
        state.userVoteStats[body.data.finishedTicketId] = body.data.voteResult.voteStat;
        state.activeTicketId = 0;
    }
}
