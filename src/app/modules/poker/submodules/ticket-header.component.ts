import {
    Component,
    Input
}                          from "@angular/core";
import {IPokerState}       from "../interfaces/i-poker-state";
import {AccountService}    from "../../account/service/account-service";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {ITicket}           from "../interfaces/i-ticket";

@Component({
    selector:    'app-ticket-header',
    templateUrl: './views/ticket-header.html',
    providers:   [],
})
export class TicketHeaderComponent
{
    @Input() state: IPokerState;
    @Input() ticket: ITicket;

    constructor(
      private rxStompService: RxStompService,
      private accountService: AccountService
    )
    {
    }

    protected isAdmin(): boolean
    {
        return null != this.state.owner && this.accountService.getCurrentUser().idSecure == this.state.owner.idSecure;
    }

    protected startTicket(ticketId: number)
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_VOTE_START
            .replace("{pokerIdSecure}", this.state.pokerIdSecureFromParams)
            .replace("{ticketId}", ticketId.toString(10)),
          ''
        );
    }

    protected deleteTicket(ticketId: number)
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_TICKET_DELETE
            .replace("{pokerIdSecure}", this.state.pokerIdSecureFromParams)
            .replace("{ticketId}", ticketId.toString(10)),
          ''
        );
    }

    protected endTicket(): void
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_VOTE_STOP
            .replace("{pokerIdSecure}", this.state.pokerIdSecureFromParams)
            .replace("{ticketId}", this.state.activeTicketId.toString(10)),
          ''
        );
        this.state.activeTicketId = 0;
    }

    protected closeTicket()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_TICKET_CLOSE
            .replace("{pokerIdSecure}", this.state.pokerIdSecureFromParams)
            .replace("{ticketId}", this.state.activeTicketId.toString(10)),
          ''
        );
    }

    protected getVoteCount(ticketId: number)
    {
        return this.state.votes[ticketId] ? Object.keys(this.state.votes[ticketId]).length : "waiting";
    }

    protected getVoteAvg(ticketId: number)
    {
        return this.state.userVoteAvgs[ticketId] ?? "waiting";
    }

    protected getVoteMin(ticketId: number)
    {
        return this.state.userVoteMins[ticketId] ?? "waiting";
    }

    protected getVoteMax(ticketId: number)
    {
        return this.state.userVoteMaxs[ticketId] ?? "waiting";
    }
}
