import {Injectable}       from "@angular/core";
import {IStdApiResponse}  from "../../../interfaces/i-std-api-response";
import {ISessionResponse} from "../interfaces/i-session-response";
import {PokerStateStore}  from "../poker-state-store.service";

@Injectable()
export class SessionClosedService
{
    constructor(private pokerStateStore: PokerStateStore)
    {
    }

    public setSessionClosed(body: IStdApiResponse<ISessionResponse>)
    {
        this.pokerStateStore.state.inGameInsecureUsersWithSessions[body.data.insecureUser.idSecure] = undefined;
    }
}
