import {IStdApiResponse}       from "../../../interfaces/i-std-api-response";
import {IVoteResponse}         from "../interfaces/i-vote-response";
import {IPokerState}           from "../interfaces/i-poker-state";
import {Injectable}            from "@angular/core";
import {IInsecureUser}         from "../../account/interfaces/i-insecure-user";
import {FlashMessageLevelEnum} from "../../flash-message/enums/flash-message-level-enum";
import {FlashMessageService}   from "../../flash-message/services/flash-message-service";

@Injectable()
export class VoteService
{
    public constructor(private flashMessageService: FlashMessageService)
    {
    }

    public setVote(body: IStdApiResponse<IVoteResponse>, state: IPokerState)
    {
        let insecureUser: IInsecureUser = body.data.voterInsecureUser;

        if (!state.votes[state.activeTicketId])
        {
            state.votes[state.activeTicketId] = {};
        }
        state.votes[state.activeTicketId][insecureUser.idSecure] = insecureUser;

        this.flashMessageService.push({
            messageLevel: FlashMessageLevelEnum.OK,
            message:      `Vote from: ${insecureUser.userName}`
        })
    }
}
