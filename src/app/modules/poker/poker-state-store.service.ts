import {IPokerState} from "./interfaces/i-poker-state";
import {Injectable}  from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class PokerStateStore
{
    private _state: IPokerState = {
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
    };

    private stateSubject = new BehaviorSubject<IPokerState>(this._state);
    public state$ = this.stateSubject.asObservable();

    public get state(): IPokerState {
        return this._state;
    }

    public updateState(updates: Partial<IPokerState>): void {
        this._state = { ...this._state, ...updates };
        this.stateSubject.next(this._state);
    }

    public setState(newState: IPokerState): void {
        this._state = newState;
        this.stateSubject.next(this._state);
    }
}
