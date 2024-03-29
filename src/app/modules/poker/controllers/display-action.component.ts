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
import {IVote}                 from "../interfaces/i-vote";
import {IStart}                from "../interfaces/i-start";
import {PokerSubscriptionService} from "../service/poker-subscription-service";


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
    protected isInitDone          = false;
    protected poker: IPoker;
    protected tickets: Array<ITicket>;
    protected activeRoundTicketId = 0;
    protected voteUncertainty     = 0;
    protected voteComplexity      = 0;
    protected voteEffort          = 0;
    private pokerStartListener: ISubscriptionListener<IStart>;
    private roomStateListener: ISubscriptionListener<IStateResponse>;
    private roundStartListener: ISubscriptionListener<IStartRound>;
    private roundStopListener: ISubscriptionListener<IStartRound>;
    private voteListener: ISubscriptionListener<IVote>;

    public constructor(
      private rxStompService: RxStompService,
      private activatedRoute: ActivatedRoute,
      private pokerSubscriptionService: PokerSubscriptionService
    )
    {
        this.pokerIdSecure                    = this.activatedRoute.snapshot.paramMap.get('secureId');
        this.pokerStartListener               = this.rxStompService.getSubscription(
          `/queue/reply-${this.pokerIdSecure}`,
          SocketDestination.RECEIVE_POKER_START
        );
        this.pokerStartListener.$subscription = this.pokerStartListener.observable.subscribe(
          (data) => console.log(data)
        );

        this.roomStateListener               = this.rxStompService.getSubscription<IStateResponse>(
          '/user/queue/reply',
          SocketDestination.RECEIVE_POKER_ROOM_STATE
        );
        this.roomStateListener.$subscription = this.roomStateListener.observable.subscribe(
          (body) =>
          {
              console.log('roomStateListener', body);
              this.poker      = body.data.poker;
              this.tickets    = body.data.tickets;
              this.isInitDone = true;
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


        this.voteListener               = this.rxStompService.getSubscription<IStartRound>(
          `/queue/reply-${this.pokerIdSecure}`,
          SocketDestination.RECEIVE_POKER_VOTE
        );
        this.voteListener.$subscription = this.voteListener.observable.subscribe((body) =>
        {
            console.log("Vote happened");
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

    endRound()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROUND_STOP
            .replace("{pokerSecureId}", this.pokerIdSecure)
            .replace("{ticketId}", this.activeRoundTicketId.toString(10)),
          ''
        );
        this.activeRoundTicketId = 0;
    }

    setVoteUncertainty(vote: number)
    {
        this.voteUncertainty = vote;
    }

    setVoteComplexity(vote: number)
    {
        this.voteComplexity = vote;
    }

    setVoteEffort(vote: number)
    {
        this.voteEffort = vote;
    }

    send()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_VOTE
            .replace("{pokerSecureId}", this.pokerIdSecure)
            .replace("{ticketId}", this.activeRoundTicketId.toString(10)),
          {
              voteUncertainty: this.voteUncertainty,
              voteComplexity:  this.voteComplexity,
              voteEffort:      this.voteEffort,
          }
        );
    }
}
