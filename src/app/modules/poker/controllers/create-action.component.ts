import {
    Component,
    OnDestroy
}              from '@angular/core';
import {Forms} from '../forms';
import {FormGroup}          from "@angular/forms";
import {RxStompService}     from "../../commons/services/rx-stomp-service";
import {SocketDestination}  from "../../commons/enums/socket-destination";
import {IStart}             from "../interfaces/i-start";
import {Router}             from "@angular/router";
import {Subscription}       from "rxjs";

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
    private $subscription: Subscription;

    public constructor(
      protected forms: Forms,
      private rxStompService: RxStompService,
      private router: Router,
    )
    {
        this.form = this.forms.createCruForm();

        this.$subscription = this.rxStompService
          .getSubscription<IStart>('/user/queue/reply', SocketDestination.RECEIVE_POKER_START)
          .subscribe((body) =>
            this.router.navigate(['/poker/display/' + body.data.poker.idSecure])
          );
    }

    ngOnDestroy(): void {
        this.rxStompService.unsubscribe('/user/queue/reply', this.$subscription);
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
