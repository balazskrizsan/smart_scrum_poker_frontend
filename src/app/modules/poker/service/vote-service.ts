import {IStdApiResponse}       from "../../../interfaces/i-std-api-response";
import {IVoteResponse}         from "../interfaces/i-vote-response";
import {Injectable}            from "@angular/core";
import {IInsecureUser}         from "../../account/interfaces/i-insecure-user";
import {FlashMessageLevelEnum} from "../../flash-message/enums/flash-message-level-enum";
import {FlashMessageService}   from "../../flash-message/services/flash-message-service";
import {PokerStateStore}       from "../poker-state-store.service";

@Injectable()
export class VoteService
{
    public constructor(
      private flashMessageService: FlashMessageService,
      private pokerStateStore: PokerStateStore,
    )
    {
    }

    public setVote(body: IStdApiResponse<IVoteResponse>)
    {
        const state = this.pokerStateStore.state;
        const insecureUser: IInsecureUser = body.data.voterInsecureUser;

        this.pokerStateStore.addVote(state.activeTicketId, insecureUser.idSecure, insecureUser);

        this.flashMessageService.push({
            messageLevel: FlashMessageLevelEnum.OK,
            message:      `Vote from: ${insecureUser.userName}`
        })
    }
}
