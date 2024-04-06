import {Injectable} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {IPoker}                             from './interfaces/i-poker';

@Injectable()
export class Forms {
  private CruFields: any = {
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    ticketNames: new FormArray([]),
  };

  newTicketName(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  getFields(): any {
    return this.CruFields;
  }

  createCruForm(): FormGroup {
    return new FormGroup(
      {
        id: this.CruFields.id,
        name: this.CruFields.name,
        ticketNames: this.CruFields.ticketNames,
      }
    );
  }

  getFieldValue(field: string): string {
    return this.getField(field).value;
  }

  getField(field: string): FormControl {
    return this.CruFields[field];
  }

  getArrayField(field: string): FormArray {
    return this.CruFields[field];
  }
}
