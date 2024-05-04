import {
    Component,
    Input,
}                          from "@angular/core";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {AccountService}    from "../../account/service/account-service";
import {IPokerState}       from "../interfaces/i-poker-state";
import {ITicket}           from "../interfaces/i-ticket";

@Component({
    selector:    'app-voter-table',
    templateUrl: './views/voter-table.html',
    providers:   [],
})
export class VoterTableComponent
{
    @Input() state: IPokerState;
    @Input() ticket: ITicket;

    protected voteUncertainty = 0;
    protected voteComplexity = 0;
    protected voteEffort = 0;
    protected voteOptions = ["SMALL", "MEDIUM", "LARGE"];

    constructor(
      private rxStompService: RxStompService,
      private accountService: AccountService,
    )
    {
    }

    setVoteUncertainty(vote: number): void
    {
        if (this.voteUncertainty == vote)
        {
            this.voteUncertainty = 0;

            return;
        }
        this.voteUncertainty = vote;
    }

    setVoteComplexity(vote: number): void
    {
        if (this.voteComplexity == vote)
        {
            this.voteComplexity = 0;

            return;
        }
        this.voteComplexity = vote;
    }

    setVoteEffort(vote: number): void
    {
        if (this.voteEffort == vote)
        {
            this.voteEffort = 0;

            return;
        }
        this.voteEffort = vote;
    }

    isVoteSendable(): boolean
    {
        return this.voteUncertainty > 0 && this.voteComplexity > 0 && this.voteEffort > 0;
    }

    getComplexityClass(vote: number): string
    {
        return vote == this.voteComplexity ? 'btn-blue' : 'btn-primary';
    }

    getUncertaintyClass(vote: number): string
    {
        return vote == this.voteUncertainty ? 'btn-blue' : 'btn-primary';
    }

    getEffortClass(vote: number): string
    {
        return vote == this.voteEffort ? 'btn-blue' : 'btn-primary';
    }

    send()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_VOTE
            .replace("{pokerIdSecure}", this.state.pokerIdSecureFromParams)
            .replace("{ticketId}", this.ticket.id.toString(10)),
          {
              userIdSecure:    this.accountService.getCurrentUser().idSecure,
              pokerIdSecure:   this.state.pokerIdSecureFromParams,
              ticketId:        this.ticket.id,
              voteUncertainty: this.voteUncertainty,
              voteComplexity:  this.voteComplexity,
              voteEffort:      this.voteEffort,
          }
        );
    }
}