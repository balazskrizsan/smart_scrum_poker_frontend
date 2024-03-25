import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractForm} from '../../../forms/abstract-form';

@Injectable()
export class StackReviewForm extends AbstractForm{
  private CruFields: any = {
    visibility: new FormControl('0', [Validators.required, Validators.pattern(/^[1-3]$/)]),
    rate: new FormControl('0', [Validators.required, Validators.pattern(/^[1-5]$/)]),
    review: new FormControl('', [Validators.required, Validators.minLength(10)]),
  };

  public getFields(): any {
    return this.CruFields;
  }

  public createCruForm(): FormGroup {
    return new FormGroup(
      {
        visibility: this.CruFields.visibility,
        rate: this.CruFields.rate,
        review: this.CruFields.review,
      }
    );
  }
}
