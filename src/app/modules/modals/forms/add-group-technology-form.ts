import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractForm} from '../../../forms/abstract-form';

@Injectable()
export class AddGroupTechnologyForm extends AbstractForm {
  private CruFields = {
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    groupSizeId: new FormControl(0, [Validators.required, Validators.pattern(/^[1-7]$/)]),
  };

  public getFields(): any {
    return this.CruFields;
  }

  public createCruForm(): FormGroup {
    return new FormGroup(
      {
        name: this.CruFields.name,
        groupSizeId: this.CruFields.groupSizeId,
      }
    );
  }
}
