import {NgModule}              from '@angular/core';
import {CommonModule}          from '@angular/common';
import {SharedModule}          from '../shared-module';
import {FlashMessageComponent} from './flash-message.component';
import {CommonsModule}         from '../commons/commons.module';

@NgModule({
    imports:      [CommonModule, SharedModule, CommonsModule],
    exports:      [FlashMessageComponent],
    declarations: [FlashMessageComponent]
})
export class FlashMessageModule
{
}
