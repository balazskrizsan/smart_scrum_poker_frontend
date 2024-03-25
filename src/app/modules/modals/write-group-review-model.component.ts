import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
}                                        from '@angular/core';
import {ModalService}                    from './model-service';
import {ModalIdEnum}                     from './enums/modal-id-enum';
import {FormGroup}                       from '@angular/forms';
import {StackReviewForm}                 from './forms/stack-review-form';
import {AbstractModalComponent}          from './abstract-modal.component';
import {IWriteGroupReviewModelComponent} from './interfaces/i-write-group-review-model-component';

@Component({
    selector:        'app-stack-review-modal',
    templateUrl:     './views/stack-review.html',
    providers:       [StackReviewForm],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WriteGroupReviewModelComponent
  extends AbstractModalComponent
  implements OnInit, IWriteGroupReviewModelComponent
{
    public isModalVisible     = false;
    public form: FormGroup;

    private groupId: number;

    public constructor(
      cdr: ChangeDetectorRef,
      private modalService: ModalService,
      private stackReviewForm: StackReviewForm
    )
    {
        super(cdr);
        this.form = stackReviewForm.createCruForm();
    }

    public ngOnInit(): void
    {
        this.modalService.register(ModalIdEnum.WRITE_GROUP_REVIEW, this);
    }

    public open(groupId: number): void
    {
        this.cdrTick();

        this.groupId        = groupId;
        this.isModalVisible = true;
    }

    public close(): void
    {
        this.isModalVisible = false;
        // @todo: reset form (view)
        this.form.reset();
        this.cdrTick();
    }

    public onSubmit(): void
    {
        if (false === this.isModalVisible)
        {
            return;
        }

        if (this.form.valid)
        {
            const values    = this.form.getRawValue();
            values.group_id = this.groupId;

            return;
        }

        this.form.markAllAsTouched();
    }

    // @todo: ngClass error not working properly
    public hasValidationError(fieldName: string): boolean
    {
        const field = this.stackReviewForm.getField(fieldName);

        return field.invalid && field.touched;
    }
}
