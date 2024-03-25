import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractForm} from '../../../forms/abstract-form';

@Injectable()
export class AddGroupForm extends AbstractForm{
  private CruFields: any = {
    typeId: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    groupSizeId: new FormControl(0, [Validators.required, Validators.pattern(/^[1-7]$/)]),
  };

  public getFields(): any {
    return this.CruFields;
  }

  public createCruForm(): FormGroup {
    return new FormGroup(
      {
        typeId: this.CruFields.typeId,
        name: this.CruFields.name,
        groupSizeId: this.CruFields.groupSizeId,
      }
    );
  }
}
