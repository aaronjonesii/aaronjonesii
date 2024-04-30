import { Injectable } from '@angular/core';
import { Functions, httpsCallableData, HttpsCallableOptions, FunctionsError } from '@angular/fire/functions';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FunctionsService {

  constructor(private functions: Functions) {}

  /**
   * Create a promise to return last value from Firebase Function observable
   *
   * @param functionName {string} - The firebase function's name.
   * @param data - The firebase function's request data.
   * @param options {HttpsCallableOptions} - The firebase function's request data.
   */
  httpsCallable<ResponseData = unknown>(
    functionName: string,
    data?: unknown | null,
    options?: HttpsCallableOptions
  ): Promise<ResponseData | FunctionsError> {
    return lastValueFrom(
      httpsCallableData(this.functions, functionName, options)(data) as Observable<ResponseData | FunctionsError>,
    );
  }
}
