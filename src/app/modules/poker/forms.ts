import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPoker}                             from './interfaces/i-poker';

@Injectable()
export class Forms {
  private CruFields: any = {
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  };

  getFields(): any {
    return this.CruFields;
  }

  createCruForm(): FormGroup {
    return new FormGroup(
      {
        id: this.CruFields.id,
        name: this.CruFields.name,
      }
    );
  }

  getFieldValue(field: string): string {
    return this.getField(field).value;
  }

  getField(field: string): FormControl {
    return this.CruFields[field];
  }

  createPatchMap(poker: IPoker): IPoker {
    return {
      id: poker.id,
      idSecure: poker.idSecure,
      name: poker.name,
    };
  }
}
