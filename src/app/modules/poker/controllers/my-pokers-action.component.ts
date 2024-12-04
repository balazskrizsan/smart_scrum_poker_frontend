import {
    Component,
    OnDestroy
}                              from '@angular/core';
import {Forms}                 from '../forms';
import {FormGroup}             from "@angular/forms";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {AccountService}        from "../../account/service/account-service";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {SubscriptionService}   from "../service/subscription-service";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";
import {IMyPokersResponse}     from "../interfaces/i-my-pokers-response";
import {IPoker}                from "../interfaces/i-poker";
import {UrlService}            from "../../commons/services/url-service";

@Component(
  {
      templateUrl: '../views/my-pokers.html',
      styleUrls:   [],
      providers:   [Forms],
  }
)
export class MyPokersActionComponent implements OnDestroy
{
    protected urlService = UrlService;
    protected form: FormGroup;
    protected myPokersListener: ISubscriptionListener<IMyPokersResponse>;
    protected myPokers: Array<IPoker> = [];

    public constructor(
      protected forms: Forms,
      private rxStompService: RxStompService,
      private accountService: AccountService,
      private subscriptionService: SubscriptionService,
    )
    {
        let user = this.accountService.getCurrentUserOrRedirect();

        this.myPokersListener = this.rxStompService.getSubscription<IMyPokersResponse>(
          '/user/queue/reply',
          SocketDestination.POKER__MY_TICKETS
        );

        this.myPokersListener.$subscription = this.myPokersListener.observable.subscribe(
          (body) => this.myPokers = body.data.pokers
        );

        this.rxStompService.publish(SocketDestination.POKER__MY_TICKETS, {userIdInsecure: user.idSecure});
        this.subscriptionService.subscribeForMyPokers();
    }

    ngOnDestroy(): void
    {
        this.rxStompService.unsubscribe(this.myPokersListener);
    }
}
