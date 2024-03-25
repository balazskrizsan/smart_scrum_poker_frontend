import {Injectable}                         from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractForm}                       from '../../../forms/abstract-form';

@Injectable()
export class OwnCompanyForm extends AbstractForm
{
    private CruFields: any = {
        emailPart: new FormControl('', [Validators.required, Validators.minLength(1)]),
    };

    public getFields(): any
    {
        return this.CruFields;
    }

    public createCruForm(): FormGroup
    {
        return new FormGroup(
          {
              emailPart: this.CruFields.emailPart,
          }
        );
    }
}
