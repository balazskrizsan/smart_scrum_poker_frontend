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
        this.pokerStateStore.addFinishedTicketId(Number(body.data.finishedTicketId));
        this.pokerStateStore.setUserVotes(body.data.finishedTicketId, body.data.voteResult.votes);
        this.pokerStateStore.setUserVoteStats(body.data.finishedTicketId, body.data.voteResult.voteStat);
        this.pokerStateStore.updateState({activeTicketId: 0});
    }
}
