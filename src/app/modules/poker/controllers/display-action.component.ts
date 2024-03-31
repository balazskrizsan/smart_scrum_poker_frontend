import {
    Component,
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
import {LocalStorageService}   from "../../../services/local-storage-service";
import {IInsecureUser}         from "../../account/interfaces/i-insecure-user";
import {IVoteResponse}         from "../interfaces/i-vote-response";
import {FlashMessageService}   from "../../flash-message/services/flash-message-service";
import {FlashMessageLevelEnum} from "../../flash-message/enums/flash-message-level-enum";

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
    protected isInitDone                                            = false;
    protected poker: IPoker;
    protected tickets: Array<ITicket>;
    protected activeRoundTicketId                                   = 0;
    protected voteUncertainty                                       = 0;
    protected voteComplexity                                        = 0;
    protected voteEffort                                            = 0;
    protected voters: Record<number, Record<string, IInsecureUser>> = {};
    private pokerStartListener: ISubscriptionListener<IStart>;
    private roomStateListener: ISubscriptionListener<IStateResponse>;
    private roundStartListener: ISubscriptionListener<IStartRound>;
    private roundStopListener: ISubscriptionListener<IStartRound>;
    private voteListener: ISubscriptionListener<IVoteResponse>;

    public constructor(
      private rxStompService: RxStompService,
      private activatedRoute: ActivatedRoute,
      private localStorageService: LocalStorageService,
      private flashMessageService: FlashMessageService
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
              this.isInitDone            = true;
              let possibleStartedTickets = this.tickets.filter(t => t.isActive);
              if (possibleStartedTickets.length > 1)
              {
                  throw new Error('More than 1 voting started');
              }
              if (possibleStartedTickets.length == 1)
              {
                  this.activeRoundTicketId = possibleStartedTickets.pop().id;
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
              this.activeRoundTicketId = body.data.startedTicketId;
          });

        this.roundStopListener               = this.rxStompService
          .getSubscription<IStartRound>(
            `/queue/reply-${this.pokerIdSecure}`,
            SocketDestination.RECEIVE_POKER_ROUND_STOP
          );
        this.roundStopListener.$subscription = this.roundStopListener.observable.subscribe(
          (body) =>
          {
              this.activeRoundTicketId = 0;
          });

        this.voteListener               = this.rxStompService.getSubscription<IVoteResponse>(
          `/queue/reply-${this.pokerIdSecure}`,
          SocketDestination.RECEIVE_POKER_VOTE
        );
        this.voteListener.$subscription = this.voteListener.observable.subscribe((body) =>
        {
            let insecureUser: IInsecureUser = body.data.voterInsecureUser;

            if (!this.voters[this.activeRoundTicketId])
                this.voters[this.activeRoundTicketId] = {};
            this.voters[this.activeRoundTicketId][insecureUser.idSecure] = insecureUser;

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
        this.rxStompService.unsubscribe(this.roundStopListener);
        this.rxStompService.unsubscribe(this.voteListener);
    }

    async ngOnInit(): Promise<void>
    {
        this.init();
    }

    init()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROOM_STATE.replace("{pokerSecureId}", this.pokerIdSecure),
          ''
        );
    }

    pokerRoomPush()
    {
        this.rxStompService.publish(SocketDestination.POKER_ROOM + this.pokerIdSecure, 'hello')
    }

    startRound(ticketId: number)
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROUND_START
            .replace("{pokerSecureId}", this.pokerIdSecure)
            .replace("{ticketId}", ticketId.toString(10)),
          ''
        );
    }

    endRound(): void
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROUND_STOP
            .replace("{pokerSecureId}", this.pokerIdSecure)
            .replace("{ticketId}", this.activeRoundTicketId.toString(10)),
          ''
        );
        this.resetVoteValues();
    }

    setVoteUncertainty(vote: number): void
    {
        if (this.voteUncertainty == vote)
        {
            this.voteUncertainty = 0;

            return
        }
        this.voteUncertainty = vote;
    }

    setVoteComplexity(vote: number): void
    {
        if (this.voteComplexity == vote)
        {
            this.voteComplexity = 0;

            return
        }
        this.voteComplexity = vote;
    }

    setVoteEffort(vote: number): void
    {
        if (this.voteEffort == vote)
        {
            this.voteEffort = 0;

            return
        }
        this.voteEffort = vote;
    }

    private resetVoteValues()
    {
        this.activeRoundTicketId = 0;
        this.voteEffort          = 0;
        this.voteComplexity      = 0;
        this.voteUncertainty     = 0;
    }

    isVoteSendable(): boolean
    {
        return this.voteUncertainty > 0 && this.voteComplexity > 0 && this.voteEffort > 0;
    }

    send(): void
    {
        var rawInsecureUser = this.localStorageService.get('current_user');
        if (null == rawInsecureUser)
        {
            throw new Error("Not logged in");
        }
        var insecureUser: IInsecureUser = JSON.parse(rawInsecureUser);

        this.rxStompService.publish(
          SocketDestination.SEND_POKER_VOTE
            .replace("{pokerSecureId}", this.pokerIdSecure)
            .replace("{ticketId}", this.activeRoundTicketId.toString(10)),
          {
              userIdSecure:    insecureUser.idSecure,
              pokerIdSecure:   this.pokerIdSecure,
              ticketId:        this.activeRoundTicketId,
              voteUncertainty: this.voteUncertainty,
              voteComplexity:  this.voteComplexity,
              voteEffort:      this.voteEffort,
          }
        );
    }
}
