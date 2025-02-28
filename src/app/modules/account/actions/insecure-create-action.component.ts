import {
    Component,
    OnDestroy
}                              from "@angular/core";
import {Forms}                 from "../forms";
import {FormGroup}             from "@angular/forms";
import {IStateResponse}        from "../../poker/interfaces/i-state-response";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {ISubscriptionListener} from "../../poker/interfaces/i-subscription-listener";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {AccountService}        from "../service/account-service";
import {LocalStorageService}   from "../../../services/local-storage-service";

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
    private userCreationListener: ISubscriptionListener<IStateResponse>;

    constructor(
      private forms: Forms,
      private rxStompService: RxStompService,
      private accountService: AccountService,
      private localStorageService: LocalStorageService
    )
    {
        this.form = this.forms.createCruForm();

        this.userCreationListener = this.rxStompService.getSubscription<IStateResponse>(
          '/user/queue/reply',
          SocketDestination.RECEIVE_INSECURE_USER_CREATE
        );
        this.userCreationListener.$subscription = this.userCreationListener.observable.subscribe(
          (body) =>
          {
              let redirectUri = this.localStorageService.pop("login_redirect_from");

              this.accountService.login(body.data, redirectUri);
          });

    }

    ngOnDestroy(): void
    {
        this.rxStompService.unsubscribe(this.userCreationListener);
    }

    onSubmit()
    {
        this.rxStompService.publish(
          SocketDestination.SEND_INSECURE_USER_CREATE,
          {
              userName: this.form.getRawValue().userName
          }
        );
    }
}
