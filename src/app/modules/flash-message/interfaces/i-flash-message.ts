import {FlashMessageLevelEnum} from '../enums/flash-message-level-enum';

export interface IFlashMessage
{
    messageLevel: FlashMessageLevelEnum;
    message: string;
    errorCode?: number;
}
