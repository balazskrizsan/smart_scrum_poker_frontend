import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class Forms {
  private CruFields: any = {
    id:       new FormControl(null, []),
    idSecure: new FormControl(null, []),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
  };

  getFields(): any {
    return this.CruFields;
  }

  createCruForm(): FormGroup {
    return new FormGroup(
      {
        id: this.CruFields.id,
        idSecure: this.CruFields.idSecure,
        userName: this.CruFields.userName,
      }
    );
  }

  getFieldValue(field: string): string {
    return this.getField(field).value;
  }

  getField(field: string): FormControl {
    return this.CruFields[field];
  }
}
