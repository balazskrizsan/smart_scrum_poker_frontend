import {
    Component,
    Input
}                    from "@angular/core";
import {IPokerState} from "../interfaces/i-poker-state";

@Component({
    selector:    'app-online-voters',
    templateUrl: './views/online-voters.html',
    providers:   [],
})
export class OnlineVotersComponent
{
    @Input() state: IPokerState;
}
