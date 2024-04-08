import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit
}                              from '@angular/core';
import {Forms}                 from '../forms';
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {ActivatedRoute}        from "@angular/router";
import {IStateResponse}        from "../interfaces/i-state-response";
import {IPoker}                from "../interfaces/i-poker";
import {ITicket}               from "../interfaces/i-ticket";
import {IStartRound}           from "../interfaces/i-start-round";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";
import {IStart}                from "../interfaces/i-start";
import {IInsecureUser}         from "../../account/interfaces/i-insecure-user";
import {IVoteResponse}         from "../interfaces/i-vote-response";
import {FlashMessageService}   from "../../flash-message/services/flash-message-service";
import {FlashMessageLevelEnum} from "../../flash-message/enums/flash-message-level-enum";
import {AccountService}        from "../../account/service/account-service";
import {EventEnum}             from "../enums/event-enum";
import {IVoteStopResponse}     from "../interfaces/i-vote-stop-response";
import {IVote}                 from "../interfaces/i-vote";

@Component(
  {
      templateUrl: './../views/display.html',
      styleUrls:   [],
      providers:   [Forms],
  }
)
export class DisplayActionComponent implements OnInit, OnDestroy
{
    protected pokerIdSecure: string;
    protected poker: IPoker;
    protected owner: IInsecureUser;
    protected inGameInsecureUsers: Array<IInsecureUser>;
    protected tickets: Array<ITicket>;
    protected activeTicketId                                       = 0;
    protected openedTicketId                                       = 0;
    protected finishedTicketIds: Array<number>                     = [];
    protected votes: Record<number, Record<string, IInsecureUser>> = {};
    protected userVotes: Record<number, Record<string, IVote>>     = {};
    protected readonly Object                                      = Object;
    protected gameEvents: EventEmitter<EventEnum>                  = new EventEmitter<EventEnum>()
    private readonly pokerStartListener: ISubscriptionListener<IStart>;
    private readonly roomStateListener: ISubscriptionListener<IStateResponse>;
    private readonly roundStartListener: ISubscriptionListener<IStartRound>;
    private readonly voteStopListener: ISubscriptionListener<IVoteStopResponse>;
    private readonly ticketCloseListener: ISubscriptionListener<IVoteStopResponse>;
    private readonly voteListener: ISubscriptionListener<IVoteResponse>;

    public constructor(
      private rxStompService: RxStompService,
      private activatedRoute: ActivatedRoute,
      private flashMessageService: FlashMessageService,
      private accountService: AccountService,
    )
    {
        this.pokerIdSecure                    = this.activatedRoute.snapshot.paramMap.get('secureId');
        this.pokerStartListener               = this.rxStompService.getSubscription(
          `/queue/reply-${this.pokerIdSecure}`,
          SocketDestination.RECEIVE_POKER_START
        );
        this.pokerStartListener.$subscription = this.pokerStartListener.observable.subscribe();

        this.roomStateListener               = this.rxStompService.getSubscription<IStateResponse>(
          '/user/queue/reply',
          SocketDestination.RECEIVE_POKER_ROOM_STATE
        );
        this.roomStateListener.$subscription = this.roomStateListener.observable.subscribe(
          (body) =>
          {
              this.poker                 = body.data.poker;
              this.tickets               = body.data.tickets;
              this.inGameInsecureUsers   = body.data.inGameInsecureUsers;
              this.votes                 = body.data.votes;
              this.owner                 = body.data.owner;
              // @todo: finishedVoteIds
              let possibleStartedTickets = this.tickets.filter(t => t.isActive);
              if (possibleStartedTickets.length > 1)
              {
                  throw new Error('More than 1 voting started');
              }
              if (possibleStartedTickets.length == 1)
              {
                  this.activeTicketId = possibleStartedTickets.pop().id;
                  this.openedTicketId = this.activeTicketId;
                  console.log(
                    this.activeTicketId,
                    this.openedTicketId
                  )
              }
          });

        this.roundStartListener               = this.rxStompService
          .getSubscription<IStartRound>(
            `/queue/reply-${this.pokerIdSecure}`,
            SocketDestination.RECEIVE_POKER_ROUND_START
          );
        this.roundStartListener.$subscription = this.roundStartListener.observable.subscribe(
          (body) =>
          {
              this.activeTicketId = body.data.startedTicketId;
              this.openedTicketId = body.data.startedTicketId;
              console.log(this)
          });

        this.voteStopListener               = this.rxStompService
          .getSubscription<IVoteStopResponse>(
            `/queue/reply-${this.pokerIdSecure}`,
            SocketDestination.RECEIVE_POKER_ROUND_STOP
          );
        this.voteStopListener.$subscription = this.voteStopListener.observable.subscribe(
          (body) =>
          {
              this.finishedTicketIds.push(Number(body.data.finishedTicketId));
              this.userVotes[body.data.finishedTicketId] = body.data.votes;
              this.activeTicketId                        = 0;
          });

        this.ticketCloseListener               = this.rxStompService
          .getSubscription<IVoteStopResponse>(
            `/queue/reply-${this.pokerIdSecure}`,
            SocketDestination.RECEIVE_POKER_TICKET_CLOSE
          );
        this.ticketCloseListener.$subscription = this.ticketCloseListener.observable.subscribe(
          (body) =>
          {
              this.openedTicketId = 0;
          });

        this.voteListener               = this.rxStompService.getSubscription<IVoteResponse>(
          `/queue/reply-${this.pokerIdSecure}`,
          SocketDestination.RECEIVE_POKER_VOTE
        );
        this.voteListener.$subscription = this.voteListener.observable.subscribe((body) =>
        {
            let insecureUser: IInsecureUser = body.data.voterInsecureUser;

            if (!this.votes[this.activeTicketId])
            {
                this.votes[this.activeTicketId] = {};
            }
            this.votes[this.activeTicketId][insecureUser.idSecure] = insecureUser;

            this.flashMessageService.push({
                messageLevel: FlashMessageLevelEnum.OK,
                message:      `Vote from: ${insecureUser.userName}`
            })
        });
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
        this.init();
    }

    protected init()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROOM_STATE
            .replace("{pokerIdSecure}", this.pokerIdSecure)
            .replace("{insecureUserId}", this.accountService.getCurrentUser().idSecure),
          ''
        );
    }

    protected pokerRoomPush()
    {
        this.rxStompService.publish(SocketDestination.POKER_ROOM + this.pokerIdSecure, 'hello')
    }

    protected startTicket(ticketId: number)
    {
        this.gameEvents.emit(EventEnum.START_ROUND);
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROUND_START
            .replace("{pokerIdSecure}", this.pokerIdSecure)
            .replace("{ticketId}", ticketId.toString(10)),
          ''
        );
    }

    protected endTicket(): void
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROUND_STOP
            .replace("{pokerIdSecure}", this.pokerIdSecure)
            .replace("{ticketId}", this.activeTicketId.toString(10)),
          ''
        );
        this.gameEvents.emit(EventEnum.END_ROUND);
        this.activeTicketId = 0;
    }

    protected closeTicket()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_TICKET_CLOSE
            .replace("{pokerIdSecure}", this.pokerIdSecure)
            .replace("{ticketId}", this.activeTicketId.toString(10)),
          ''
        );
    }

    protected getVoteState(userIdSecure: string, ticketId: number): "done" | "waiting"
    {
        return this.votes[ticketId] && this.votes[ticketId][userIdSecure] ? "done" : "waiting";
    }

    protected isAdmin(): boolean
    {
        return this.accountService.getCurrentUser().idSecure == this.owner.idSecure;
    }

    getCalculatedPoint(ticketId: number, userIdSecure: string)
    {
        if (this.finishedTicketIds.includes(ticketId))
        {
            if (this.userVotes[ticketId] && this.userVotes[ticketId][userIdSecure])
            {
                return this.userVotes[ticketId][userIdSecure].calculatedPoint;
            }
        }

        return "?";
    }
}
