import {Injectable}                            from '@angular/core';
import {ModalIdEnum}                           from './enums/modal-id-enum';
import {IStackReviewModelComponent}            from './interfaces/i-stack-review-model-component';
import {IAddGroupModelComponent}               from './interfaces/i-add-group-config';
import {IWriteGroupReviewModelComponent}       from './interfaces/i-write-group-review-model-component';

@Injectable({providedIn: 'root'})
export class ModalService
{
    private modalsNew: Map<number, any> = new Map(); // @todo: change any with interface

    public register(id: number, modal: {}): void
    {
        this.modalsNew.set(id, modal);
    }

    private getModal<T>(id: number): T
    {
        if (!this.modalsNew.has(id))
        {
            console.error('Modal not found with id#' + id);

            return;
        }

        return this.modalsNew.get(id);
    }

    public openStackReviewModal(companyId: number): void
    {
        this.getModal<IStackReviewModelComponent>(ModalIdEnum.WRITE_GROUP_REVIEW).open(companyId);
    }

    public openAddGroupModel(groupId: number, companyId: number): void
    {
        this.getModal<IAddGroupModelComponent>(ModalIdEnum.ADD_GROUP).open(groupId, companyId);
    }

    public openAddGroupTechnologyModel(groupId: number, companyId: number): void
    {
        this.getModal<IAddGroupModelComponent>(ModalIdEnum.ADD_GROUP_TECHNOLOGY).open(groupId, companyId);
    }

    public openWriteGroupReviewModal(groupId: number): void
    {
        this.getModal<IWriteGroupReviewModelComponent>(ModalIdEnum.WRITE_GROUP_REVIEW).open(groupId);
    }
}
