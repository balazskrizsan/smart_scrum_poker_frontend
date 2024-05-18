import {IPokerState} from "./interfaces/i-poker-state";
import {Injectable}  from "@angular/core";

@Injectable()
export class PokerStateStore
{
    public state: IPokerState = {
        tickets:                         [],
        inGameInsecureUsers:             [],
        inGameInsecureUsersWithSessions: {},
        owner:                           null,
        userVoteStats:                   {},
        pokerIdSecureFromParams:         null,
        poker:                           null,
        activeTicketId:                  0,
        openedTicketId:                  0,
        votes:                           {},
        userVotes:                       {},
        initDone:                        false,
        finishedTicketIds:               [],
    }
}
