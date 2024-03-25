import {IFlashMessage} from './i-flash-message';

export interface IFlashMessageDisplayed
{
    id: number;
    createdTick: number;
    message: IFlashMessage;
}
