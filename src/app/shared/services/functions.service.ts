import { Injectable } from '@angular/core';
import { Functions, httpsCallableData, HttpsCallableOptions } from '@angular/fire/functions';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FunctionsService {

  constructor(private functions: Functions) {}

  /** Call Functions */
  httpsCallable(name: string, data?: unknown | null, options?: HttpsCallableOptions): Promise<unknown> {
    return lastValueFrom(httpsCallableData(this.functions, name, options)(data));
  }
}
