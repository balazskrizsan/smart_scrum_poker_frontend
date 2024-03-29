import {
    Component,
    OnDestroy
}                              from '@angular/core';
import {Forms}                 from '../forms';
import {FormGroup}             from "@angular/forms";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {IStart}                from "../interfaces/i-start";
import {Router}                from "@angular/router";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";

@Component(
  {
      templateUrl: '../views/create-edit.html',
      styleUrls:   [],
      providers:   [Forms],
  }
)
export class CreateActionComponent implements OnDestroy
{
    protected form: FormGroup;
    private createPokerListener: ISubscriptionListener<IStart>;

    public constructor(
      protected forms: Forms,
      private rxStompService: RxStompService,
      private router: Router,
    )
    {
        this.form = this.forms.createCruForm();

        this.createPokerListener               = this.rxStompService
          .getSubscription<IStart>('/user/queue/reply', SocketDestination.RECEIVE_POKER_START);
        this.createPokerListener.$subscription = this.createPokerListener.observable.subscribe(
          (body) =>
            this.router.navigate(['/poker/display/' + body.data.poker.idSecure])
        );
    }

    ngOnDestroy(): void
    {
        this.rxStompService.unsubscribe(this.createPokerListener);
    }

    onSubmit()
    {
        console.log("> Create poker", this.form.getRawValue());

        this.rxStompService.publish(
          SocketDestination.RECEIVE_POKER_START,
          {
              sprintTitle: this.forms.getField("name").getRawValue(),
              ticketNames: ['ID#1', 'ID#2']
          }
        )
    }
}
