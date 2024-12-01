import {
    Component,
    Input
}                          from "@angular/core";
import {IPokerState}       from "../interfaces/i-poker-state";
import {FormGroup}         from "@angular/forms";
import {NewTicketForm}     from "./forms";
import {SocketDestination} from "../../commons/enums/socket-destination";
import {RxStompService}    from "../../commons/services/rx-stomp-service";
import {AccountService}    from "../../account/service/account-service";

@Component({
    selector:    'add-ticket',
    templateUrl: './views/add-ticket.html',
    providers:   [NewTicketForm],
})
export class AddTicketComponent
{
    @Input() state: IPokerState;
    protected isOpen = false
    protected form: FormGroup;

    public constructor(
      protected forms: NewTicketForm,
      protected rxStompService: RxStompService,
      protected accountService: AccountService,
    )
    {
        this.form = this.forms.createCruForm();
    }

    protected toggleOpenState()
    {
        this.isOpen = !this.isOpen;
    }

    protected onSubmit()
    {
        this.rxStompService.publish(
          SocketDestination.SEND__POKER__NEW_TICKET_CREATE,
          {
              userIdSecure:  this.accountService.getCurrentUser().idSecure,
              pokerIdSecure: this.state.poker.idSecure,
              ticketName:    this.forms.getField("ticketName").getRawValue(),
          }
        );
    }
}
