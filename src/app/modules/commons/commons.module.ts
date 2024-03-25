import {NgModule}                        from '@angular/core';
import {ReactiveFormsModule}             from '@angular/forms';
import {CommonModule}                    from '@angular/common';
import {SharedModule}                    from '../shared-module';

@NgModule({
    imports:      [CommonModule, SharedModule, ReactiveFormsModule],
    exports:      [ReactiveFormsModule],
    declarations: [],
    providers:    []
})
export class CommonsModule
{
}
