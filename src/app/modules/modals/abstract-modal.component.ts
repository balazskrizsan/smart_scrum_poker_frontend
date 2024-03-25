import {ChangeDetectorRef} from '@angular/core';

export abstract class AbstractModalComponent
{
    private cdr;

    public constructor(
      cdr: ChangeDetectorRef
    )
    {
        this.cdr = cdr;
    }

    protected cdrTick(): void
    {
        setTimeout(() => this.cdr.detectChanges(), 100);
        setTimeout(() => this.cdr.detectChanges(), 1000);
    }
}
