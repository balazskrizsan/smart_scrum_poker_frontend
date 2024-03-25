import {
    Component,
    OnInit
}                          from '@angular/core';
import {Forms}             from '../forms';
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {ActivatedRoute}    from "@angular/router";
import {IStateResponse}    from "../interfaces/i-state-response";
import {IPoker}            from "../interfaces/i-poker";
import {ITicket}           from "../interfaces/i-ticket";


@Component(
  {
      templateUrl: './../views/display.html',
      styleUrls:   [],
      providers:   [Forms],
  }
)
export class DisplayActionComponent implements OnInit
{
    protected pokerIdSecure: string;
    protected isInitDone = false;
    protected poker: IPoker;
    protected tickets: Array<ITicket>;

    public constructor(
      private rxStompService: RxStompService,
      private activatedRoute: ActivatedRoute
    )
    {
        this.pokerIdSecure = this.activatedRoute.snapshot.paramMap.get('secureId');
        rxStompService.getSubscription(`/queue/reply-${this.pokerIdSecure}`, SocketDestination.RECEIVE_POKER_START)
          .subscribe(r => console.log('lofasz', r));

        this.rxStompService
          .getSubscription<IStateResponse>('/user/queue/reply', SocketDestination.RECEIVE_POKER_ROOM_STATE)
          .subscribe((body) =>
          {
              console.log(body);
              this.poker = body.data.poker;
              this.tickets = body.data.tickets;
              this.isInitDone = true;
          });

        // console.log("===========================================");
        // const serverUrl = 'wss://localhost:9999/ws';
        // const rxStomp = new RxStomp();
        // rxStomp.configure({
        //     brokerURL: serverUrl,
        // });
        // rxStomp.activate();
        // const subscription = rxStomp
        //   .watch({ destination: "/topic/public" })
        //   .subscribe((message) => console.log(message.body));
        // rxStomp.publish({
        //     destination: "/topic/public",
        //     body: "First message to RxStomp",
        // });

        // var stompClient = Stomp.over(ws);
        // stompClient.connect();


        // const serverUrl = 'http://localhost:8080/socket';
        // const ws = new SockJS(serverUrl);
        // var socket = new StompJs.over({
        //     brokerURL: "ws://localhost:9999/ws"
        // });
        // socket.activate();
        // socket.publish({destination: 'topic/public', body: "hola world"});
        // socket.subscribe('/topic/public', (payload) => {
        //     console.log("Message received: ", payload);
        // });

        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        //
        // this.router.events.subscribe((event) => {
        //   if (event instanceof NavigationEnd) {
        //     this.router.navigated = false;
        //     // window.scrollTo(0, 0);
        //   }
        // });
    }

    async onSubmit(): Promise<void>
    {
        console.log("Create poker")
    }

    async ngOnInit(): Promise<void>
    {
    }

    pokerRoomPush()
    {
        this.rxStompService.publish(SocketDestination.POKER_ROOM + this.pokerIdSecure, 'hello')
    }

    init()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_POKER_ROOM_STATE.replace("{pokerSecureId}", this.pokerIdSecure),
          ''
        );
    }
}
