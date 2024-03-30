import {
    Component,
    OnDestroy
}              from "@angular/core";
import {Forms} from "../forms";
import {FormGroup} from "@angular/forms";
import {IStateResponse} from "../../poker/interfaces/i-state-response";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {ISubscriptionListener} from "../../poker/interfaces/i-subscription-listener";
import {RxStompService} from "../../commons/services/rx-stomp-service";

@Component(
  {
      templateUrl: '../views/insecure-create.html',
      styleUrls:   [],
      providers:   [Forms],
  }
)
export class InsecureCreateActionComponent implements OnDestroy
{
    protected form: FormGroup;
    private roomStateListener: ISubscriptionListener<IStateResponse>;

    constructor(
      private forms: Forms,
      private rxStompService: RxStompService,
    )
    {
        this.form = this.forms.createCruForm();

        this.roomStateListener               = this.rxStompService.getSubscription<IStateResponse>(
          '/user/queue/reply',
          SocketDestination.RECIEVE_INSECURE_USER_CREATE
        );
        this.roomStateListener.$subscription = this.roomStateListener.observable.subscribe(
          (body) =>
          {
              console.log('roomStateListener', body);
          });
    }

    ngOnDestroy(): void {
        this.rxStompService.unsubscribe(this.roomStateListener);
    }

    onSubmit()
    {
        this.rxStompService.publish(SocketDestination.SEND_INSECURE_USER_CREATE,
          {
              userName: this.form.getRawValue().userName
          }
        );
    }
}
