import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
export class ConsoleLoggerService {
    constructor(snackBar) {
        this.snackBar = snackBar;
        /**
         * Checks if the application is currently running in development mode.
         *
         * @returns {boolean} True if in development mode, false otherwise.
         */
        this.isInDevelopmentMode = () => isDevMode();
    }
    /**
     * Logs a debug message to the console if in development mode.
     *
     * @param {string} value - The primary message to log.
     * @param {...unknown[]} restOfError - Additional values or error objects to log.
     */
    debug(value, ...restOfError) {
        if (!this.isInDevelopmentMode())
            return;
        console.debug(`${value}: `, restOfError);
    }
    /**
     * Logs an informational message to the console and displays a snackbar notification
     * if in development mode.
     *
     * @param {string} value - The primary message to log and display.
     * @param {...unknown[]} restOfError - Additional values or error objects to log.
     */
    info(value, ...restOfError) {
        if (this.isInDevelopmentMode()) {
            console.info(`${value}: `, restOfError);
        }
        this.openSnackBar(value, 'OK', { duration: 5000, panelClass: 'info' });
    }
    /**
     * Logs a general message to the console and displays a snackbar notification
     * if in development mode.
     *
     * @param {string} value - The primary message to log and display.
     * @param {...unknown[]} restOfError - Additional values or error objects to log.
     */
    log(value, ...restOfError) {
        if (this.isInDevelopmentMode()) {
            console.log(`${value}: `, restOfError);
        }
        this.openSnackBar(value, 'OK', { duration: 5000, panelClass: 'log' });
    }
    /**
     * Logs a warning message to the console and displays a snackbar notification
     * if in development mode.
     *
     * @param {string} value - The primary message to log and display.
     * @param {...unknown[]} restOfError - Additional values or error objects to log.
     */
    warn(value, ...restOfError) {
        if (this.isInDevelopmentMode()) {
            console.warn(`${value}: `, restOfError);
        }
        this.openSnackBar(value, 'OK', { duration: 10000, panelClass: 'warn' });
    }
    /**
     * Logs an error message to the console and displays a snackbar notification
     * if in development mode.
     *
     * @param {string} value - The primary message to log and display.
     * @param {...unknown[]} restOfError - Additional values or error objects to log.
     */
    error(value, ...restOfError) {
        if (this.isInDevelopmentMode()) {
            console.error(`${value}: `, restOfError);
        }
        this.openSnackBar(value, 'OK', { duration: 0, panelClass: 'error' });
    }
    /**
     * Opens a Material Design snackbar notification.
     *
     * @param {string} message - The text message to display.
     * @param {string | undefined} action - Optional label for the snackbar action button.
     * @param {MatSnackBarConfig | undefined} config - Configuration options for
     * the snackbar.
     * @returns {MatSnackBarRef<TextOnlySnackBar>} A reference to the snackbar.
     */
    openSnackBar(message, action, config) {
        return this.snackBar.open(message, action, config);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: ConsoleLoggerService, deps: [{ token: i1.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: ConsoleLoggerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: ConsoleLoggerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.MatSnackBar }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS1sb2dnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlyZWJhc2Utc3RvcmFnZS1tYW5hZ2VyL3NyYy9saWIvc2VydmljZXMvY29uc29sZS1sb2dnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTXRELE1BQU0sT0FBTyxvQkFBb0I7SUFRL0IsWUFBb0IsUUFBcUI7UUFBckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQVB6Qzs7OztXQUlHO1FBQ0gsd0JBQW1CLEdBQUcsR0FBWSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFTCxDQUFDO0lBRTdDOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLEtBQWEsRUFBRSxHQUFHLFdBQXNCO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFBRSxPQUFPO1FBQ3hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsSUFBSSxDQUFDLEtBQWEsRUFBRSxHQUFHLFdBQXNCO1FBQzNDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQztZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEdBQUcsQ0FBQyxLQUFhLEVBQUUsR0FBRyxXQUFzQjtRQUMxQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUM7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxJQUFJLENBQUMsS0FBYSxFQUFFLEdBQUcsV0FBc0I7UUFDM0MsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLEtBQWEsRUFBRSxHQUFHLFdBQXNCO1FBQzVDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQztZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxDQUNWLE9BQWUsRUFDZixNQUEwQixFQUMxQixNQUFxQztRQUVyQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQzs4R0E1RlUsb0JBQW9CO2tIQUFwQixvQkFBb0IsY0FEUCxNQUFNOzsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0U25hY2tCYXIsIE1hdFNuYWNrQmFyQ29uZmlnLCBNYXRTbmFja0JhclJlZiwgVGV4dE9ubHlTbmFja0Jhcixcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25zb2xlTG9nZ2VyU2VydmljZSB7XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGFwcGxpY2F0aW9uIGlzIGN1cnJlbnRseSBydW5uaW5nIGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGluIGRldmVsb3BtZW50IG1vZGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGlzSW5EZXZlbG9wbWVudE1vZGUgPSAoKTogYm9vbGVhbiA9PiBpc0Rldk1vZGUoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNuYWNrQmFyOiBNYXRTbmFja0Jhcikge31cblxuICAvKipcbiAgICogTG9ncyBhIGRlYnVnIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgaWYgaW4gZGV2ZWxvcG1lbnQgbW9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIHByaW1hcnkgbWVzc2FnZSB0byBsb2cuXG4gICAqIEBwYXJhbSB7Li4udW5rbm93bltdfSByZXN0T2ZFcnJvciAtIEFkZGl0aW9uYWwgdmFsdWVzIG9yIGVycm9yIG9iamVjdHMgdG8gbG9nLlxuICAgKi9cbiAgZGVidWcodmFsdWU6IHN0cmluZywgLi4ucmVzdE9mRXJyb3I6IHVua25vd25bXSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0luRGV2ZWxvcG1lbnRNb2RlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLmRlYnVnKGAke3ZhbHVlfTogYCwgcmVzdE9mRXJyb3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ3MgYW4gaW5mb3JtYXRpb25hbCBtZXNzYWdlIHRvIHRoZSBjb25zb2xlIGFuZCBkaXNwbGF5cyBhIHNuYWNrYmFyIG5vdGlmaWNhdGlvblxuICAgKiBpZiBpbiBkZXZlbG9wbWVudCBtb2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgcHJpbWFyeSBtZXNzYWdlIHRvIGxvZyBhbmQgZGlzcGxheS5cbiAgICogQHBhcmFtIHsuLi51bmtub3duW119IHJlc3RPZkVycm9yIC0gQWRkaXRpb25hbCB2YWx1ZXMgb3IgZXJyb3Igb2JqZWN0cyB0byBsb2cuXG4gICAqL1xuICBpbmZvKHZhbHVlOiBzdHJpbmcsIC4uLnJlc3RPZkVycm9yOiB1bmtub3duW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luRGV2ZWxvcG1lbnRNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhgJHt2YWx1ZX06IGAsIHJlc3RPZkVycm9yKTtcbiAgICB9XG4gICAgdGhpcy5vcGVuU25hY2tCYXIodmFsdWUsICdPSycsIHtkdXJhdGlvbjogNTAwMCwgcGFuZWxDbGFzczogJ2luZm8nfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyBhIGdlbmVyYWwgbWVzc2FnZSB0byB0aGUgY29uc29sZSBhbmQgZGlzcGxheXMgYSBzbmFja2JhciBub3RpZmljYXRpb25cbiAgICogaWYgaW4gZGV2ZWxvcG1lbnQgbW9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIHByaW1hcnkgbWVzc2FnZSB0byBsb2cgYW5kIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7Li4udW5rbm93bltdfSByZXN0T2ZFcnJvciAtIEFkZGl0aW9uYWwgdmFsdWVzIG9yIGVycm9yIG9iamVjdHMgdG8gbG9nLlxuICAgKi9cbiAgbG9nKHZhbHVlOiBzdHJpbmcsIC4uLnJlc3RPZkVycm9yOiB1bmtub3duW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luRGV2ZWxvcG1lbnRNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAke3ZhbHVlfTogYCwgcmVzdE9mRXJyb3IpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5TbmFja0Jhcih2YWx1ZSwgJ09LJywge2R1cmF0aW9uOiA1MDAwLCBwYW5lbENsYXNzOiAnbG9nJ30pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ3MgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgYW5kIGRpc3BsYXlzIGEgc25hY2tiYXIgbm90aWZpY2F0aW9uXG4gICAqIGlmIGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBwcmltYXJ5IG1lc3NhZ2UgdG8gbG9nIGFuZCBkaXNwbGF5LlxuICAgKiBAcGFyYW0gey4uLnVua25vd25bXX0gcmVzdE9mRXJyb3IgLSBBZGRpdGlvbmFsIHZhbHVlcyBvciBlcnJvciBvYmplY3RzIHRvIGxvZy5cbiAgICovXG4gIHdhcm4odmFsdWU6IHN0cmluZywgLi4ucmVzdE9mRXJyb3I6IHVua25vd25bXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5EZXZlbG9wbWVudE1vZGUoKSkge1xuICAgICAgY29uc29sZS53YXJuKGAke3ZhbHVlfTogYCwgcmVzdE9mRXJyb3IpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5TbmFja0Jhcih2YWx1ZSwgJ09LJywge2R1cmF0aW9uOiAxMDAwMCwgcGFuZWxDbGFzczogJ3dhcm4nfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSBjb25zb2xlIGFuZCBkaXNwbGF5cyBhIHNuYWNrYmFyIG5vdGlmaWNhdGlvblxuICAgKiBpZiBpbiBkZXZlbG9wbWVudCBtb2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgcHJpbWFyeSBtZXNzYWdlIHRvIGxvZyBhbmQgZGlzcGxheS5cbiAgICogQHBhcmFtIHsuLi51bmtub3duW119IHJlc3RPZkVycm9yIC0gQWRkaXRpb25hbCB2YWx1ZXMgb3IgZXJyb3Igb2JqZWN0cyB0byBsb2cuXG4gICAqL1xuICBlcnJvcih2YWx1ZTogc3RyaW5nLCAuLi5yZXN0T2ZFcnJvcjogdW5rbm93bltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbkRldmVsb3BtZW50TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGAke3ZhbHVlfTogYCwgcmVzdE9mRXJyb3IpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5TbmFja0Jhcih2YWx1ZSwgJ09LJywge2R1cmF0aW9uOiAwLCBwYW5lbENsYXNzOiAnZXJyb3InfSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYSBNYXRlcmlhbCBEZXNpZ24gc25hY2tiYXIgbm90aWZpY2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSB0ZXh0IG1lc3NhZ2UgdG8gZGlzcGxheS5cbiAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IGFjdGlvbiAtIE9wdGlvbmFsIGxhYmVsIGZvciB0aGUgc25hY2tiYXIgYWN0aW9uIGJ1dHRvbi5cbiAgICogQHBhcmFtIHtNYXRTbmFja0JhckNvbmZpZyB8IHVuZGVmaW5lZH0gY29uZmlnIC0gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvclxuICAgKiB0aGUgc25hY2tiYXIuXG4gICAqIEByZXR1cm5zIHtNYXRTbmFja0JhclJlZjxUZXh0T25seVNuYWNrQmFyPn0gQSByZWZlcmVuY2UgdG8gdGhlIHNuYWNrYmFyLlxuICAgKi9cbiAgb3BlblNuYWNrQmFyKFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBhY3Rpb246IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBjb25maWc6IE1hdFNuYWNrQmFyQ29uZmlnIHwgdW5kZWZpbmVkLFxuICApOiBNYXRTbmFja0JhclJlZjxUZXh0T25seVNuYWNrQmFyPiB7XG4gICAgcmV0dXJuIHRoaXMuc25hY2tCYXIub3BlbihtZXNzYWdlLCBhY3Rpb24sIGNvbmZpZyk7XG4gIH1cbn1cbiJdfQ==