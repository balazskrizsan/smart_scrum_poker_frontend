import {FormControl, FormGroup} from '@angular/forms';

export abstract class AbstractForm {
  abstract getFields(): {};

  abstract createCruForm(): FormGroup;

  public getFieldValue(field: string): string {
    return this.getField(field).value;
  }

  public getField(field: string): FormControl {
    return this.getFields()[field];
  }
}
