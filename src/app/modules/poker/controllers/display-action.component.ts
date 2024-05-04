import {
    Component,
    OnDestroy,
    OnInit
}                               from '@angular/core';
import {Forms}                  from '../forms';
import {RxStompService}         from "../../commons/services/rx-stomp-service";
import {SocketDestination}      from "../../commons/enums/socket-destination";
import {ActivatedRoute}         from "@angular/router";
import {IStateResponse}         from "../interfaces/i-state-response";
import {ITicket}                from "../interfaces/i-ticket";
import {IStartRound}            from "../interfaces/i-start-round";
import {ISubscriptionListener}  from "../interfaces/i-subscription-listener";
import {IStartResponse}         from "../interfaces/i-start-response";
import {IInsecureUser}          from "../../account/interfaces/i-insecure-user";
import {IVoteResponse}          from "../interfaces/i-vote-response";
import {FlashMessageService}    from "../../flash-message/services/flash-message-service";
import {FlashMessageLevelEnum}  from "../../flash-message/enums/flash-message-level-enum";
import {AccountService}         from "../../account/service/account-service";
import {IVoteStopResponse}      from "../interfaces/i-vote-stop-response";
import {IVoteNewJoinerResponse} from "../interfaces/i-vote-new-joiner-response";
import _                        from 'lodash';
import {ISessionResponse}       from "../interfaces/i-session-response";
import {IPokerState}            from "../interfaces/i-poker-state";

@Component({
    templateUrl: './../views/display.html',
    styleUrls:   [],
    providers:   [Forms],
})
export class DisplayActionComponent implements OnInit, OnDestroy
{
    protected state: IPokerState = {
        inGameInsecureUsers:             [],
        inGameInsecureUsersWithSessions: {},
        owner:                           null,
        userVoteAvgs:                    {},
        userVoteMins:                    {},
        userVoteMaxs:                    {},
        pokerIdSecureFromParams:         null,
        poker:                           null,
        activeTicketId:                  0,
        openedTicketId:                  0,
        votes:                           {},
        userVotes:                       {},
        initDone:                        false,
        finishedTicketIds:               [],
    }
    protected tickets: Array<ITicket>;
    private readonly pokerStartListener: ISubscriptionListener<IStartResponse>;
    private readonly sessionCreatedOrUpdatedListener: ISubscriptionListener<ISessionResponse>;
    private readonly sessionClosedListener: ISubscriptionListener<ISessionResponse>;
    private readonly roomStateListener: ISubscriptionListener<IStateResponse>;
    private readonly roundStartListener: ISubscriptionListener<IStartRound>;
    private readonly voteStopListener: ISubscriptionListener<IVoteStopResponse>;
    private readonly ticketCloseListener: ISubscriptionListener<IVoteStopResponse>;
    private readonly voteListener: ISubscriptionListener<IVoteResponse>;
    private readonly voteNewJoinerListener: ISubscriptionListener<IVoteNewJoinerResponse>;

    public constructor(
      private rxStompService: RxStompService,
      private activatedRoute: ActivatedRoute,
      private flashMessageService: FlashMessageService,
      private accountService: AccountService,
    )
    {
        this.state.pokerIdSecureFromParams = this.activatedRoute.snapshot.paramMap.get('secureId');
        this.pokerStartListener = this.rxStompService.getSubscription(
          `/queue/reply-${this.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_START
        );
        this.pokerStartListener.$subscription = this.pokerStartListener.observable.subscribe();

        this.sessionCreatedOrUpdatedListener = this.rxStompService.getSubscription<ISessionResponse>(
          `/queue/reply-${this.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_SESSION_CREATED_OR_UPDATED
        );
        this.sessionCreatedOrUpdatedListener.$subscription = this.sessionCreatedOrUpdatedListener.observable.subscribe(
          (body) =>
          {
              this.state.inGameInsecureUsersWithSessions[body.data.insecureUser.idSecure] = true;
          });

        this.sessionClosedListener = this.rxStompService.getSubscription<ISessionResponse>(
          `/queue/reply-${this.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_SESSION_CLOSED
        );
        this.sessionClosedListener.$subscription = this.sessionClosedListener.observable.subscribe(
          (body) =>
          {
              this.state.inGameInsecureUsersWithSessions[body.data.insecureUser.idSecure] = undefined;
          });

        this.roomStateListener = this.rxStompService.getSubscription<IStateResponse>(
          '/user/queue/reply',
          SocketDestination.RECEIVE_POKER_ROOM_STATE
        );
        this.roomStateListener.$subscription = this.roomStateListener.observable.subscribe(
          (body) =>
          {
              this.state.poker = body.data.poker;
              this.tickets = body.data.tickets;
              this.state.inGameInsecureUsers = body.data.inGameInsecureUsers;
              this.state.votes = body.data.votes;
              this.state.owner = body.data.owner;
              body.data.inGameInsecureUsersWithSession.forEach(i =>
              {
                  this.state.inGameInsecureUsersWithSessions[i.idSecure] = true;
              });
              // @todo: finishedVoteIds
              let possibleStartedTickets = this.tickets.filter(t => t.isActive);
              if (possibleStartedTickets.length > 1)
              {
                  throw new Error('More than 1 voting started');
              }
              if (possibleStartedTickets.length == 1)
              {
                  this.state.activeTicketId = possibleStartedTickets.pop().id;
                  this.state.openedTicketId = this.state.activeTicketId;
              }
              this.state.initDone = true;
          }
        );

        this.roundStartListener = this.rxStompService.getSubscription<IStartRound>(
          `/queue/reply-${this.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_ROUND_START
        );
        this.roundStartListener.$subscription = this.roundStartListener.observable.subscribe(
          (body) =>
          {
              this.state.activeTicketId = body.data.startedTicketId;
              this.state.openedTicketId = body.data.startedTicketId;
          }
        );

        this.voteNewJoinerListener = this.rxStompService.getSubscription<IVoteNewJoinerResponse>(
          `/queue/reply-${this.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_VOTE_NEW_JOINER
        );
        this.voteNewJoinerListener.$subscription = this.voteNewJoinerListener.observable.subscribe(
          (body) =>
          {
              const insecureUser = body.data.insecureUser;
              if (!_.find(this.state.inGameInsecureUsers, insecureUser))
              {
                  this.state.inGameInsecureUsers.push(insecureUser);
              }
          }
        );

        this.voteStopListener = this.rxStompService.getSubscription<IVoteStopResponse>(
          `/queue/reply-${this.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_ROUND_STOP
        );
        this.voteStopListener.$subscription = this.voteStopListener.observable.subscribe(
          (body) =>
          {
              this.state.finishedTicketIds.push(Number(body.data.finishedTicketId));
              this.state.userVotes[body.data.finishedTicketId] = body.data.voteResult.votes;
              this.state.userVoteAvgs[body.data.finishedTicketId] = body.data.voteResult.avg;
              this.state.userVoteMins[body.data.finishedTicketId] = body.data.voteResult.min;
              this.state.userVoteMaxs[body.data.finishedTicketId] = body.data.voteResult.max;
              this.state.activeTicketId = 0;
          }
        );

        this.ticketCloseListener = this.rxStompService.getSubscription<IVoteStopResponse>(
          `/queue/reply-${this.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_TICKET_CLOSE
        );
        this.ticketCloseListener.$subscription = this.ticketCloseListener.observable.subscribe(() =>
        {
            this.state.openedTicketId = 0;
        });

        this.voteListener = this.rxStompService.getSubscription<IVoteResponse>(
          `/queue/reply-${this.state.pokerIdSecureFromParams}`,
          SocketDestination.RECEIVE_POKER_VOTE
        );
        this.voteListener.$subscription = this.voteListener.observable.subscribe((body) =>
          {
              let insecureUser: IInsecureUser = body.data.voterInsecureUser;

              if (!this.state.votes[this.state.activeTicketId])
              {
                  this.state.votes[this.state.activeTicketId] = {};
              }
              this.state.votes[this.state.activeTicketId][insecureUser.idSecure] = insecureUser;

              this.flashMessageService.push({
                  messageLevel: FlashMessageLevelEnum.OK,
                  message:      `Vote from: ${insecureUser.userName}`
              })
          }
        );
    }

    ngOnDestroy(): void
    {
        this.rxStompService.unsubscribe(this.pokerStartListener);
        this.rxStompService.unsubscribe(this.roomStateListener);
        this.rxStompService.unsubscribe(this.roundStartListener);
        this.rxStompService.unsubscribe(this.voteStopListener);
        this.rxStompService.unsubscribe(this.ticketCloseListener);
        this.rxStompService.unsubscribe(this.voteListener);
    }

    async ngOnInit(): Promise<void>
    {
        this.accountService.getCurrentUserOrRedirect();
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROOM_STATE
            .replace("{pokerIdSecure}", this.state.pokerIdSecureFromParams)
            .replace("{insecureUserId}", this.accountService.getCurrentUser().idSecure),
          ''
        );
    }
}
