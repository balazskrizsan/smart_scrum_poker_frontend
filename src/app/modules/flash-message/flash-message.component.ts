import {
    Component,
    OnInit
}                               from '@angular/core';
import {FlashMessageState}      from './states/flash-message-state';
import {interval}               from 'rxjs';
import {IFlashMessageDisplayed} from './interfaces/i-flash-message-displayed';
import {UiService}              from './services/ui-service';

@Component({
    selector:    'app-flash-message',
    styleUrls: [ './styles/flash-message.component.scss' ],
    templateUrl: './views/flash-message.html',
})
export class FlashMessageComponent implements OnInit
{
    private static tickTime = 1000;
    private static messageDisplayTicks = 20;

    public messages: Array<IFlashMessageDisplayed> = [];
    public uiService = new UiService();

    public constructor(private flashMessageState: FlashMessageState)
    {
    }

    public ngOnInit(): void
    {
        let currentTick = 0;
        let currentId = 0;
        interval(FlashMessageComponent.tickTime).subscribe((tick) =>
        {
            currentTick = tick;

            this.messages = this.messages.filter(m =>
            {
                return m.createdTick + FlashMessageComponent.messageDisplayTicks > tick;
            });
        });

        this.flashMessageState.getAsObservable$().subscribe((newMessage) =>
        {
            if (!newMessage)
            {
                return;
            }

            this.messages.push({
                id:          currentId++,
                createdTick: currentTick,
                message:     newMessage
            });
        });
    }

    public hide(id: number): void
    {
        this.messages = this.messages.filter(m => id !== m.id);
    }
}
