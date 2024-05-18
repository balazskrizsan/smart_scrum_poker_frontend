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
        const state = this.pokerStateStore.state;
        const insecureUser = body.data.insecureUser;
        if (!_.find(state.inGameInsecureUsers, insecureUser))
        {
            state.inGameInsecureUsers.push(insecureUser);
            state.inGameInsecureUsersWithSessions[insecureUser.idSecure] = true;
        }
    }
}
