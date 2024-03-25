import {FlashMessageLevelEnum} from '../enums/flash-message-level-enum';

export class UiService
{
    public getClassByLevel(messageLevel: FlashMessageLevelEnum): string
    {
        if (messageLevel === FlashMessageLevelEnum.ERROR)
        {
            return 'error';
        }

        if (messageLevel === FlashMessageLevelEnum.NOTICE)
        {
            return 'notice';
        }

        return 'ok';
    }

    public getIconClassByLevel(messageLevel: FlashMessageLevelEnum): string
    {
        if (messageLevel === FlashMessageLevelEnum.ERROR)
        {
            return 'sj-svg-little-delete';
        }

        if (messageLevel === FlashMessageLevelEnum.NOTICE)
        {
            return 'sj-svg-thunder-icon';
        }

        return 'sj-svg-check-icon';
    }
}
