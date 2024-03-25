import {Injectable}                  from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IFlashMessage}               from '../interfaces/i-flash-message';

@Injectable({providedIn: 'root'})
export class FlashMessageState
{
    private messages: BehaviorSubject<IFlashMessage | null> = new BehaviorSubject(null);

    public getAsObservable$(): Observable<IFlashMessage | null>
    {
        return this.messages.asObservable();
    }

    public setState(user: IFlashMessage | null): void
    {
        setTimeout(() =>
        {
            this.messages.next(user);
        }, 0);
    }
}
