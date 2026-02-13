import {
    Component,
    OnDestroy,
    OnInit
}                              from '@angular/core';
import {Forms}                 from '../forms';
import {
    FormArray,
    FormGroup,
    ReactiveFormsModule
}                              from "@angular/forms";
import {RxStompService}        from "../../commons/services/rx-stomp-service";
import {SocketDestination}     from "../../commons/enums/socket-destination";
import {IStartResponse}        from "../interfaces/i-start-response";
import {RouterNavigateService} from "../service/router-navigate-service";
import {ISubscriptionListener} from "../interfaces/i-subscription-listener";
import {AccountService}        from "../../account/service/account-service";
import {CommonModule}          from "@angular/common";

@Component(
  {
      templateUrl: '../views/create-edit.html',
      standalone:  true,
      imports:     [CommonModule, ReactiveFormsModule],
      styleUrls:   [],
      providers:   [Forms, RouterNavigateService],
  }
)
export class CreateActionComponent implements OnDestroy, OnInit
{
    protected form: FormGroup;
    private createPokerListener: ISubscriptionListener<IStartResponse>;
    private hasSubmit = false;

    public constructor(
      protected forms: Forms,
      private rxStompService: RxStompService,
      private routerNavigateService: RouterNavigateService,
      private accountService: AccountService,
    )
    {
        this.form = this.forms.createCruForm();

        this.createPokerListener = this.rxStompService
          .getSubscription<IStartResponse>('/user/queue/reply', SocketDestination.RECEIVE_POKER_START);
        this.createPokerListener.$subscription = this.createPokerListener.observable.subscribe(
          (body) =>
            this.routerNavigateService.navigateToPoker(body.data.poker.idSecure)
        );
    }

    ngOnInit(): void
    {
        this.accountService.getCurrentUserOrRedirect();
        this.addTicketNameField();
    }

    ngOnDestroy(): void
    {
        this.rxStompService.unsubscribe(this.createPokerListener);
    }

    get ticketNames(): FormArray
    {
        return this.form.get("ticketNames") as FormArray
    }

    addTicketNameField()
    {
        this.ticketNames.push(this.forms.newTicketName())
    }

    public hasValidationError(fieldName: string): boolean
    {
        const field = this.forms.getField(fieldName);

        return field.invalid && (field.touched || this.hasSubmit);
    }

    public hasArrayValidationError(fieldName: string, index: number): boolean
    {
        const field = this.forms.getArrayField(fieldName).at(index);

        return field.invalid && (field.touched || this.hasSubmit);
    }

    onSubmit()
    {
        this.hasSubmit = true;
        if (this.form.valid)
        {
            console.log(">>>> Create poker", this.form.getRawValue());

            this.rxStompService.publish(
              SocketDestination.RECEIVE_POKER_START,
              {
                  sprintTitle:           this.forms.getField("name").getRawValue(),
                  ticketNames:           this.form.getRawValue().ticketNames.flatMap(tn => tn.name),
                  starterInsecureUserId: this.accountService.getCurrentUser().idSecure,
              }
            );
        }
    }
}
