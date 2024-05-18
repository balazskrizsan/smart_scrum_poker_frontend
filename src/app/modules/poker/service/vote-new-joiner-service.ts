import {IStdApiResponse}        from "../../../interfaces/i-std-api-response";
import {IVoteNewJoinerResponse} from "../interfaces/i-vote-new-joiner-response";
import {IPokerState}            from "../interfaces/i-poker-state";
import _                        from 'lodash';

export class VoteNewJoinerService
{
    public setVoteNewJoiner(body: IStdApiResponse<IVoteNewJoinerResponse>, state: IPokerState)
    {
        const insecureUser = body.data.insecureUser;
        if (!_.find(state.inGameInsecureUsers, insecureUser))
        {
            state.inGameInsecureUsers.push(insecureUser);
            state.inGameInsecureUsersWithSessions[insecureUser.idSecure] = true;
        }
    }
}
