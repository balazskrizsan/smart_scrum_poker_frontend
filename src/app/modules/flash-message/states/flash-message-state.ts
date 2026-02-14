import {Injectable}    from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    shareReplay
}                      from 'rxjs';
import {IFlashMessage} from '../interfaces/i-flash-message';

@Injectable({providedIn: 'root'})
export class FlashMessageState
{
    private messages: BehaviorSubject<IFlashMessage | null> = new BehaviorSubject(null as any);

    public getAsObservable$(): Observable<IFlashMessage | null>
    {
        return this.messages.asObservable().pipe(shareReplay(1));
    }

    public setState(message: IFlashMessage | null): void
    {
        this.messages.next(message);
    }
}
