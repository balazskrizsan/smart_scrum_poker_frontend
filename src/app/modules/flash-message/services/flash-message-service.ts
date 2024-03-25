import {Injectable}        from '@angular/core';
import {IFlashMessage}     from '../interfaces/i-flash-message';
import {FlashMessageState} from '../states/flash-message-state';

@Injectable({providedIn: 'root'})
export class FlashMessageService
{
    public constructor(private flashMessageState: FlashMessageState)
    {
    }

    public push(message: IFlashMessage): void
    {
        this.flashMessageState.setState(message);
    }
}
