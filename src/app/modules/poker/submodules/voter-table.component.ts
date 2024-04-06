import {
    Component,
    EventEmitter,
    Input,
}                          from "@angular/core";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {AccountService}    from "../../account/service/account-service";
import {EventEnum}         from "../enums/event-enum";

@Component({
    selector:    'app-voter-table',
    templateUrl: './views/voter-table.html',
    providers:   [],
})
export class VoterTableComponent
{
    @Input()
    private pokerIdSecure: string;
    @Input()
    private ticketId: number;
    @Input()
    private gameEvents: EventEmitter<EventEnum>

    protected voteUncertainty = 0;
    protected voteComplexity  = 0;
    protected voteEffort      = 0;
    protected voteOptions     = ["SMALL", "MEDIUM", "LARGE"];

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
            .replace("{pokerSecureId}", this.pokerIdSecure)
            .replace("{ticketId}", this.ticketId.toString(10)),
          {
              userIdSecure:    this.accountService.getCurrentUser().idSecure,
              pokerIdSecure:   this.pokerIdSecure,
              ticketId:        this.ticketId,
              voteUncertainty: this.voteUncertainty,
              voteComplexity:  this.voteComplexity,
              voteEffort:      this.voteEffort,
          }
        );
    }
}