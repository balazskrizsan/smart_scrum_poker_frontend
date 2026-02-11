import {IStdApiResponse}       from "../../../interfaces/i-std-api-response";
import {Injectable}            from "@angular/core";
import {PokerStateStore}       from "../poker-state-store.service";
import {IVoterLeavingResponse} from "../interfaces/i-voter-leaving-response";

@Injectable()
export class VoterLeavingService
{
    public constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public leave(body: IStdApiResponse<IVoterLeavingResponse>)
    {
        this.pokerStateStore.removeInGameUser(body.data.userIdSecure);
    }
}
