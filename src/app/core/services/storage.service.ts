import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set(name: string, value: any) {
    if (window.localStorage) {
      window.localStorage[name] = JSON.stringify(value);
    }
  }

  get(name: string) {
    try {
      if (window.localStorage && window.localStorage[name]) {
        return JSON.parse(window.localStorage[name]);
      }

      return null;
    } catch {
      return null;
    }
  }

  clear(name: string) {
    if (window.localStorage) {
      window.localStorage.removeItem(name);
    }

    return null;
  }
}
