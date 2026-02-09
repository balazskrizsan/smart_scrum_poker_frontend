import {
    Component,
    Input,
}                          from "@angular/core";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {AccountService}    from "../../account/service/account-service";
import {IPokerState}       from "../interfaces/i-poker-state";
import {ITicket}           from "../interfaces/i-ticket";
import {
    CommonModule,
    KeyValue
} from "@angular/common";

@Component({
    selector:    'app-voter-table',
    standalone:   true,
    imports: [CommonModule],
    templateUrl: './views/voter-table.html',
    providers:   [],
})
export class VoterTableComponent
{
    @Input() state: IPokerState;
    @Input() ticket: ITicket;
    protected voteTypeIdMap = {
        0: "uncertainty",
        1: "complexity",
        2: "effort",
        3: "risk",
    };
    protected votes = {
        uncertainty: 0,
        complexity:  0,
        effort:      0,
        risk:        0,
    };
    protected voteConfig: Array<Record<number, Record<string, number>>> = [
        {0: {"SMALL": 1, "MEDIUM": 2, "LARGE": 3, "XXL": 10}},
        {1: {"SMALL": 1, "MEDIUM": 2, "LARGE": 3, "XXL": 10}},
        {2: {"SMALL": 1, "MEDIUM": 2, "LARGE": 3, "XXL": 10}},
        {3: {"SMALL": 1, "MEDIUM": 2, "LARGE": 3, "XXL": 10}},
    ];

    constructor(
      private rxStompService: RxStompService,
      private accountService: AccountService,
    )
    {
    }

    protected asStringNumberRecord(obj: object): Record<string, number>
    {
        return obj as Record<string, number>;
    }

    protected compareKeys: (a: KeyValue<string, number>, b: KeyValue<string, number>) =>
      number = (a: KeyValue<string, number>, b: KeyValue<string, number>) => parseInt(a.key) - parseInt(b.key);

    protected getButtonClass(voteTypeId: number, vote: number): string
    {
        return vote == this.votes[this.voteTypeIdMap[voteTypeId]] ? 'btn-blue' : 'btn-primary';
    }

    protected setVote(voteTypeId: number, vote: number): void
    {
        this.votes[this.voteTypeIdMap[voteTypeId]] = vote;
    }

    protected isVoteSendable(): boolean
    {
        return this.votes.uncertainty > 0 && this.votes.complexity > 0 && this.votes.effort > 0 && this.votes.risk > 0;
    }

    protected send()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_VOTE
            .replace("{pokerIdSecure}", this.state.pokerIdSecureFromParams)
            .replace("{ticketId}", this.ticket.id.toString(10)),
          {
              userIdSecure:    this.accountService.getCurrentUser().idSecure,
              pokerIdSecure:   this.state.pokerIdSecureFromParams,
              ticketId:        this.ticket.id,
              voteUncertainty: this.votes.uncertainty,
              voteComplexity:  this.votes.complexity,
              voteEffort:      this.votes.effort,
              voteRisk:        this.votes.risk,
          }
        );
    }
}
