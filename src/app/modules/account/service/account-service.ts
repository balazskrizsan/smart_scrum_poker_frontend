import {
    EventEmitter,
    Injectable
} from "@angular/core";
import {IInsecureUser}       from "../interfaces/i-insecure-user";
import {LocalStorageService} from "../../../services/local-storage-service";
import {Router}              from "@angular/router";
import {IStateResponse}      from "../../poker/interfaces/i-state-response";
import {EventEnum} from "../enums/event-enum";

@Injectable()
export class AccountService
{
    protected accountEvents: EventEmitter<EventEnum> = new EventEmitter<EventEnum>();

    constructor(
      protected router: Router,
      private localStorageService: LocalStorageService
    )
    {
    }

    public getAccountEvents(): EventEmitter<EventEnum> {
        return this.accountEvents;
    }

    public getCurrentUserOrRedirect(): IInsecureUser
    {
        try
        {
            return this.getCurrentUser();
        }
        catch (e)
        {
            this.router.navigate(['/account']);
        }
    }

    public getCurrentUser(): IInsecureUser
    {
        const rawInsecureUser = this.localStorageService.get('current_user');
        if (null == rawInsecureUser)
        {
            throw new Error("Not logged in");
        }

        return JSON.parse(rawInsecureUser);
    }

    logout()
    {
        this.localStorageService.delete('current_user');
        this.accountEvents.emit(EventEnum.USER_LOGOUT);
        this.router.navigate(['/']);
    }

    login(data: IStateResponse)
    {
        this.localStorageService.set('current_user', data);
        this.accountEvents.emit(EventEnum.USER_LOGIN);
        this.router.navigate(['/poker/create']);
    }
}
