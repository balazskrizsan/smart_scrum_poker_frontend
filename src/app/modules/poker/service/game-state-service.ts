import {Injectable}      from "@angular/core";
import {IStdApiResponse} from "../../../interfaces/i-std-api-response";
import {IStateResponse}  from "../interfaces/i-state-response";
import {IPokerState}     from "../interfaces/i-poker-state";

@Injectable()
export class GameStateService
{
    public setGametState(body: IStdApiResponse<IStateResponse>, state: IPokerState)
    {
        state.poker = body.data.poker;
        state.tickets = body.data.tickets;
        state.inGameInsecureUsers = body.data.inGameInsecureUsers;
        Object.entries(body.data.votesWithVoteStatList).forEach(([key, value]) =>
        {
            state.votes[key] = value.votes;
            state.userVoteStats[key] = value.voteStat;
        });
        state.finishedTicketIds = Object.keys(body.data.votes).map(k => Number(k));
        state.owner = body.data.owner;
        body.data.inGameInsecureUsersWithSession.forEach(iu =>
        {
            state.inGameInsecureUsersWithSessions[iu.idSecure] = true;
        });
        // @todo: finishedVoteIds
        let possibleStartedTickets = state.tickets.filter(t => t.isActive);
        if (possibleStartedTickets.length > 1)
        {
            throw new Error('More than 1 voting started');
        }
        if (possibleStartedTickets.length == 1)
        {
            state.activeTicketId = possibleStartedTickets.pop().id;
            state.openedTicketId = state.activeTicketId;
        }
        state.initDone = true;
    }
}
