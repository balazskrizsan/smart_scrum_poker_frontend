import {Injectable}          from "@angular/core";
import {Router}              from "@angular/router";
import {SubscriptionService} from "./subscription-service";

@Injectable()
export class RouterNavigateService
{
    public constructor(
      private router: Router,
      private subscriptionService: SubscriptionService
    )
    {
    }

    public navigateToPoker(pokerIdSecure: string): Promise<boolean>
    {
        this.subscriptionService.unsubscribe();
        return this.router.navigate(['/poker/display/' + pokerIdSecure]);
    }
}
