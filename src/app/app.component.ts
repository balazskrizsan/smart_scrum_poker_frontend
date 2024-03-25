import {
    Component,
    OnInit
}                       from '@angular/core';
import {UrlService}     from './modules/commons/services/url-service';
import {RxStompService} from "./modules/commons/services/rx-stomp-service";

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

    public constructor(
      private rxStompService: RxStompService
    )
    {
        rxStompService.get();
    }

    public login(): void
    {
    }

    public ngOnInit(): void
    {
    }
}
