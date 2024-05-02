import { Injectable } from '@angular/core';
import {
  Functions, httpsCallableData,
  HttpsCallableOptions, FunctionsError,
} from '@angular/fire/functions';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FunctionsService {
  constructor(private functions: Functions) {}

  /**
   * Executes a Firebase Cloud Function and provides a Promise-based
   * interface for retrieving the result.
   *
   * @param {string} functionName The name of the Firebase Cloud Function
   * to execute.
   * @param {unknown | null} data Optional data to pass as the argument to
   * the Cloud Function.
   * @param {HttpsCallableOptions} options Optional configuration options
   * for the function call.
   * @return {Promise<ResponseData | FunctionsError>} A Promise that resolves
   * with either the response data (of type 'ResponseData') from the function,
   * or a FunctionsError if an error occurs.
   */
  httpsCallable<RequestData = unknown, ResponseData = unknown>(
    functionName: string,
    data?: RequestData | null,
    options?: HttpsCallableOptions
  ): Promise<ResponseData | FunctionsError> {
    return lastValueFrom(
      httpsCallableData<RequestData, ResponseData>(
        this.functions,
        functionName,
        options,
      )(data) as Observable<ResponseData | FunctionsError>,
    );
  }
}
