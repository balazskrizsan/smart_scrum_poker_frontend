import {
    Component,
    OnInit,
    ChangeDetectorRef
}                               from '@angular/core';
import {FlashMessageState}      from './states/flash-message-state';
import {interval}               from 'rxjs';
import {IFlashMessageDisplayed} from './interfaces/i-flash-message-displayed';
import {UiService}              from './services/ui-service';
import {CommonModule}           from "@angular/common";

@Component({
    selector:    'app-flash-message',
    standalone: true,
    imports: [CommonModule],
    styleUrls: [ './styles/flash-message.component.scss' ],
    templateUrl: './views/flash-message.html',
})
export class FlashMessageComponent implements OnInit
{
    private static tickTime = 1000;
    private static messageDisplayTicks = 10;

    public messages: Array<IFlashMessageDisplayed> = [];
    public uiService = new UiService();
    private currentTick = 0;
    private currentId = 0;

    public constructor(private flashMessageState: FlashMessageState, private cdr: ChangeDetectorRef)
    {
    }

    public ngOnInit(): void
    {
        interval(FlashMessageComponent.tickTime).subscribe((tick) =>
        {
            this.currentTick = tick;

            this.messages = this.messages.filter(m =>
            {
                return m.createdTick + FlashMessageComponent.messageDisplayTicks > tick;
            });
            this.cdr.detectChanges();
        });

        this.flashMessageState.getAsObservable$().subscribe((newMessage) =>
        {
            if (!newMessage)
            {
                return;
            }

            const flashMessage = {
                id:          this.currentId++,
                createdTick: this.currentTick,
                message:     newMessage
            };

            this.messages.push(flashMessage);
            this.cdr.detectChanges();
        });
    }

    public hide(id: number): void
    {
        this.messages = this.messages.filter(m => id !== m.id);
    }
}
