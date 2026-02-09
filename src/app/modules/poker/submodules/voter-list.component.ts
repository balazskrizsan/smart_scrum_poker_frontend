import {
    Component,
    Input
}                       from "@angular/core";
import {IPokerState}    from "../interfaces/i-poker-state";
import {ITicket}        from "../interfaces/i-ticket";

@Component({
    selector:    'app-voter-list',
    standalone:   true,
    templateUrl: './views/voter-list.html',
    providers:   [],
})
export class VoterListComponent
{
    @Input() state: IPokerState;
    @Input() ticket: ITicket;

    protected getVoteState(userIdSecure: string, ticketId: number): "done" | "waiting"
    {
        return this.state.votes[ticketId] && this.state.votes[ticketId][userIdSecure] ? "done" : "waiting";
    }

    protected getCalculatedPoint(ticketId: number, userIdSecure: string)
    {
        return (
          this.state.finishedTicketIds.includes(ticketId)
          && this.state.userVotes[ticketId]
          && this.state.userVotes[ticketId][userIdSecure]
        )
          ? this.state.userVotes[ticketId][userIdSecure].calculatedPoint.toString(10)
          : "?";
    }
}
