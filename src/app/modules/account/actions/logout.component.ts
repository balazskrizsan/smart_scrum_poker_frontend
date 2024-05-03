import {
    Component,
    OnInit
}                       from "@angular/core";
import {Forms}          from "../forms";
import {AccountService} from "../service/account-service";

@Component(
  {
      template:  '',
      styleUrls: [],
      providers: [Forms],
  }
)
export class LogoutComponent implements OnInit
{
    constructor(private accountService: AccountService)
    {
    }

    ngOnInit(): void
    {
        this.accountService.logout();
    }
}