import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  private prefix = 'ssp-';

  private deriveKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  public set(key: string, value: any): boolean {
    if (value === undefined) {
      value = null;
    } else if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }

    try {
      localStorage.setItem(this.deriveKey(key), value);
    } catch (e) {
      return false;
    }

    return true;
  }

  public get(key: string): string|null {
    const item = localStorage.getItem(this.deriveKey(key));

    if (!item || item === 'null') {
      return null;
    }

    try {
      return item;
    } catch (e) {
      return null;
    }
  }

  public delete(key: string): void {
    localStorage.removeItem(this.deriveKey(key));
  }
}
