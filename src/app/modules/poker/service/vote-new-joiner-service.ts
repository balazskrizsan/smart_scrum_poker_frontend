import {IStdApiResponse}        from "../../../interfaces/i-std-api-response";
import {IVoteNewJoinerResponse} from "../interfaces/i-vote-new-joiner-response";
import _                        from 'lodash';
import {PokerStateStore}        from "../poker-state-store.service";
import {Injectable}             from "@angular/core";

@Injectable()
export class VoteNewJoinerService
{
    constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public setVoteNewJoiner(body: IStdApiResponse<IVoteNewJoinerResponse>)
    {
        const insecureUser = body.data.insecureUser;
        this.pokerStateStore.addInGameUser(insecureUser);
        this.pokerStateStore.setInGameUserSession(insecureUser.idSecure, true);
    }
}
