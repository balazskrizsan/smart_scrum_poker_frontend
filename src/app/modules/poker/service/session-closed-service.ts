import {Injectable}       from "@angular/core";
import {IStdApiResponse}  from "../../../interfaces/i-std-api-response";
import {ISessionResponse} from "../interfaces/i-session-response";
import {IPokerState}      from "../interfaces/i-poker-state";

@Injectable()
export class SessionClosedService
{
    public setSessionClosed(body: IStdApiResponse<ISessionResponse>, state: IPokerState)
    {
        state.inGameInsecureUsersWithSessions[body.data.insecureUser.idSecure] = undefined;
    }
}
