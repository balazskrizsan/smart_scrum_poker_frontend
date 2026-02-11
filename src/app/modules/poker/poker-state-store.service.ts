import {IPokerState}     from "./interfaces/i-poker-state";
import {Injectable}      from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {IInsecureUser}   from "../account/interfaces/i-insecure-user";
import _                 from 'lodash';

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

    public get state(): IPokerState
    {
        return this._state;
    }

    public setActiveTicketId(ticketId: number): void
    {
        this.updateState({activeTicketId: ticketId});
    }

    public setOpenedTicketId(ticketId: number): void
    {
        this.updateState({openedTicketId: ticketId});
    }

    public getActiveTicketId(): number
    {
        return this._state.activeTicketId;
    }

    public getOpenedTicketId(): number
    {
        return this._state.openedTicketId;
    }

    public addVote(ticketId: number, userIdSecure: string, user: IInsecureUser): void
    {
        const updatedVotes = {...this._state.votes};
        if (!updatedVotes[ticketId])
        {
            updatedVotes[ticketId] = {};
        }
        updatedVotes[ticketId][userIdSecure] = user;
        this.updateState({votes: updatedVotes});
    }

    public setVotes(votes: any): void
    {
        this.updateState({votes: {...votes}});
    }

    public addFinishedTicketId(ticketId: number): void
    {
        const updatedFinishedTicketIds = [...this._state.finishedTicketIds];
        updatedFinishedTicketIds.push(ticketId);
        this.updateState({finishedTicketIds: updatedFinishedTicketIds});
    }

    public setUserVotes(ticketId: string, votes: any): void
    {
        const updatedUserVotes = {...this._state.userVotes};
        updatedUserVotes[ticketId] = votes;
        this.updateState({userVotes: updatedUserVotes});
    }

    public setUserVoteStats(ticketId: string, voteStats: any): void
    {
        const updatedUserVoteStats = {...this._state.userVoteStats};
        updatedUserVoteStats[ticketId] = voteStats;
        this.updateState({userVoteStats: updatedUserVoteStats});
    }

    public removeInGameUser(userIdSecure: string): void
    {
        const updatedInGameUsersWithSessions = {...this._state.inGameInsecureUsersWithSessions};
        updatedInGameUsersWithSessions[userIdSecure] = undefined;
        this.updateState({inGameInsecureUsersWithSessions: updatedInGameUsersWithSessions});
    }

    public addInGameUser(user: IInsecureUser): void
    {
        const updatedInGameUsers = [...this._state.inGameInsecureUsers];
        if (!_.find(updatedInGameUsers, user))
        {
            updatedInGameUsers.push(user);
        }
        this.updateState({inGameInsecureUsers: updatedInGameUsers});
    }

    public setInGameUserSession(userIdSecure: string, hasSession: boolean): void
    {
        const updatedInGameUsersWithSessions = {...this._state.inGameInsecureUsersWithSessions};
        updatedInGameUsersWithSessions[userIdSecure] = hasSession;
        this.updateState({inGameInsecureUsersWithSessions: updatedInGameUsersWithSessions});
    }

    public addTicket(ticket: any): void
    {
        const updatedTickets = [...this._state.tickets];
        updatedTickets.push(ticket);
        this.updateState({tickets: updatedTickets});
    }

    public removeTicket(ticketId: number): void
    {
        const updatedTickets = this._state.tickets.filter(t => t.id !== ticketId);
        this.updateState({tickets: updatedTickets});
    }

    public updateState(updates: Partial<IPokerState>): void
    {
        this._state = {...this._state, ...updates};
        this.stateSubject.next(this._state);
    }
}
