import {NgModule}                             from '@angular/core';
import {ReactiveFormsModule}                  from '@angular/forms';
import {CommonModule}                         from '@angular/common';
import {SharedModule}                         from '../shared-module';
import {WriteGroupReviewModelComponent}       from './write-group-review-model.component';
import {CommonsModule}                        from '../commons/commons.module';

@NgModule({
    imports:      [CommonModule, SharedModule, ReactiveFormsModule, CommonsModule],
    exports:      [
        ReactiveFormsModule,
        WriteGroupReviewModelComponent,
    ],
    declarations: [
        WriteGroupReviewModelComponent,
    ]
})
export class ModalsModule
{
}
