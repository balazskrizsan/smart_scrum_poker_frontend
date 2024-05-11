import {
    Component,
    EventEmitter,
    OnInit
}                       from '@angular/core';
import {UrlService}     from './modules/commons/services/url-service';
import {RxStompService} from "./modules/commons/services/rx-stomp-service";
import {AccountService} from "./modules/account/service/account-service";
import {IInsecureUser}  from "./modules/account/interfaces/i-insecure-user";
import {EventEnum}      from "./modules/account/enums/event-enum";

export interface IIdentityServerUser
{
    name: string,
    picture: string,
    preferred_username: string,
    sub: string,
}

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss'],
})
export class AppComponent implements OnInit
{
    public urlService = UrlService;
    public currentUser: IInsecureUser | null = null;
    public accountEvents: EventEmitter<EventEnum>;

    public constructor(
      private rxStompService: RxStompService,
      private accountService: AccountService,
    )
    {
        this.rxStompService.get();
        this.accountEvents = this.accountService.getAccountEvents();
        this.accountEvents.subscribe(event =>
        {
            switch (event)
            {
                case EventEnum.USER_LOGIN:
                    this.currentUser = this.accountService.getCurrentUser();
                    break;
                case EventEnum.USER_LOGOUT:
                    this.currentUser = null;
                    break;
            }
        });

        this.currentUser = this.accountService.getCurrentUserOrNull();
    }

    public login(): void
    {
    }

    public ngOnInit(): void
    {
    }
}
