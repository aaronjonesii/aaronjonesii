import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
export class ConsoleLoggerService {
    constructor(snackBar) {
        this.snackBar = snackBar;
        /**
         * Checks if the application is currently running in development mode.
         *
         * @return {boolean} True if in development mode, false otherwise.
         */
        this.isInDevelopmentMode = () => isDevMode();
    }
    /**
     * Logs a debug message to the console if in development mode.
     *
     * @param {string} value - The primary message to log.
     * @param {...unknown[]} restOfError - Additional values or error objects
     * to log.
     */
    debug(value, ...restOfError) {
        if (!this.isInDevelopmentMode())
            return;
        console.debug(`${value}: `, restOfError);
    }
    /**
     * Logs an informational message to the console and displays a snackbar
     * notification if in development mode.
     *
     * @param {string} value - The primary message to log and display.
     * @param {...unknown[]} restOfError - Additional values or error objects
     * to log.
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
     * @param {...unknown[]} restOfError - Additional values or error objects
     * to log.
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
     * @param {...unknown[]} restOfError - Additional values or error objects
     * to log.
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
     * @param {...unknown[]} restOfError - Additional values or error objects
     * to log.
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
     * @param {string | undefined} action - Optional label for the snackbar
     * action button.
     * @param {MatSnackBarConfig | undefined} config - Configuration options for
     * the snackbar.
     * @return {MatSnackBarRef<TextOnlySnackBar>} A reference to the snackbar.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS1sb2dnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlyZWJhc2Utc3RvcmFnZS1tYW5hZ2VyL3NyYy9saWIvc2VydmljZXMvY29uc29sZS1sb2dnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTXRELE1BQU0sT0FBTyxvQkFBb0I7SUFRL0IsWUFBb0IsUUFBcUI7UUFBckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQVB6Qzs7OztXQUlHO1FBQ0gsd0JBQW1CLEdBQUcsR0FBWSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFTCxDQUFDO0lBRTdDOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxLQUFhLEVBQUUsR0FBRyxXQUFzQjtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQUUsT0FBTztRQUN4QyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLENBQUMsS0FBYSxFQUFFLEdBQUcsV0FBc0I7UUFDM0MsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEdBQUcsQ0FBQyxLQUFhLEVBQUUsR0FBRyxXQUFzQjtRQUMxQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUM7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxDQUFDLEtBQWEsRUFBRSxHQUFHLFdBQXNCO1FBQzNDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQztZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsS0FBYSxFQUFFLEdBQUcsV0FBc0I7UUFDNUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxDQUNWLE9BQWUsRUFDZixNQUEwQixFQUMxQixNQUFxQztRQUVyQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQzs4R0FsR1Usb0JBQW9CO2tIQUFwQixvQkFBb0IsY0FEUCxNQUFNOzsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0U25hY2tCYXIsIE1hdFNuYWNrQmFyQ29uZmlnLCBNYXRTbmFja0JhclJlZiwgVGV4dE9ubHlTbmFja0Jhcixcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25zb2xlTG9nZ2VyU2VydmljZSB7XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGFwcGxpY2F0aW9uIGlzIGN1cnJlbnRseSBydW5uaW5nIGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgaW4gZGV2ZWxvcG1lbnQgbW9kZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgaXNJbkRldmVsb3BtZW50TW9kZSA9ICgpOiBib29sZWFuID0+IGlzRGV2TW9kZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc25hY2tCYXI6IE1hdFNuYWNrQmFyKSB7fVxuXG4gIC8qKlxuICAgKiBMb2dzIGEgZGVidWcgbWVzc2FnZSB0byB0aGUgY29uc29sZSBpZiBpbiBkZXZlbG9wbWVudCBtb2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgcHJpbWFyeSBtZXNzYWdlIHRvIGxvZy5cbiAgICogQHBhcmFtIHsuLi51bmtub3duW119IHJlc3RPZkVycm9yIC0gQWRkaXRpb25hbCB2YWx1ZXMgb3IgZXJyb3Igb2JqZWN0c1xuICAgKiB0byBsb2cuXG4gICAqL1xuICBkZWJ1Zyh2YWx1ZTogc3RyaW5nLCAuLi5yZXN0T2ZFcnJvcjogdW5rbm93bltdKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzSW5EZXZlbG9wbWVudE1vZGUoKSkgcmV0dXJuO1xuICAgIGNvbnNvbGUuZGVidWcoYCR7dmFsdWV9OiBgLCByZXN0T2ZFcnJvcik7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyBhbiBpbmZvcm1hdGlvbmFsIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgYW5kIGRpc3BsYXlzIGEgc25hY2tiYXJcbiAgICogbm90aWZpY2F0aW9uIGlmIGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBwcmltYXJ5IG1lc3NhZ2UgdG8gbG9nIGFuZCBkaXNwbGF5LlxuICAgKiBAcGFyYW0gey4uLnVua25vd25bXX0gcmVzdE9mRXJyb3IgLSBBZGRpdGlvbmFsIHZhbHVlcyBvciBlcnJvciBvYmplY3RzXG4gICAqIHRvIGxvZy5cbiAgICovXG4gIGluZm8odmFsdWU6IHN0cmluZywgLi4ucmVzdE9mRXJyb3I6IHVua25vd25bXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5EZXZlbG9wbWVudE1vZGUoKSkge1xuICAgICAgY29uc29sZS5pbmZvKGAke3ZhbHVlfTogYCwgcmVzdE9mRXJyb3IpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5TbmFja0Jhcih2YWx1ZSwgJ09LJywgeyBkdXJhdGlvbjogNTAwMCwgcGFuZWxDbGFzczogJ2luZm8nIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ3MgYSBnZW5lcmFsIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgYW5kIGRpc3BsYXlzIGEgc25hY2tiYXIgbm90aWZpY2F0aW9uXG4gICAqIGlmIGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBwcmltYXJ5IG1lc3NhZ2UgdG8gbG9nIGFuZCBkaXNwbGF5LlxuICAgKiBAcGFyYW0gey4uLnVua25vd25bXX0gcmVzdE9mRXJyb3IgLSBBZGRpdGlvbmFsIHZhbHVlcyBvciBlcnJvciBvYmplY3RzXG4gICAqIHRvIGxvZy5cbiAgICovXG4gIGxvZyh2YWx1ZTogc3RyaW5nLCAuLi5yZXN0T2ZFcnJvcjogdW5rbm93bltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbkRldmVsb3BtZW50TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHt2YWx1ZX06IGAsIHJlc3RPZkVycm9yKTtcbiAgICB9XG4gICAgdGhpcy5vcGVuU25hY2tCYXIodmFsdWUsICdPSycsIHsgZHVyYXRpb246IDUwMDAsIHBhbmVsQ2xhc3M6ICdsb2cnIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ3MgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgYW5kIGRpc3BsYXlzIGEgc25hY2tiYXIgbm90aWZpY2F0aW9uXG4gICAqIGlmIGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBwcmltYXJ5IG1lc3NhZ2UgdG8gbG9nIGFuZCBkaXNwbGF5LlxuICAgKiBAcGFyYW0gey4uLnVua25vd25bXX0gcmVzdE9mRXJyb3IgLSBBZGRpdGlvbmFsIHZhbHVlcyBvciBlcnJvciBvYmplY3RzXG4gICAqIHRvIGxvZy5cbiAgICovXG4gIHdhcm4odmFsdWU6IHN0cmluZywgLi4ucmVzdE9mRXJyb3I6IHVua25vd25bXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5EZXZlbG9wbWVudE1vZGUoKSkge1xuICAgICAgY29uc29sZS53YXJuKGAke3ZhbHVlfTogYCwgcmVzdE9mRXJyb3IpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5TbmFja0Jhcih2YWx1ZSwgJ09LJywgeyBkdXJhdGlvbjogMTAwMDAsIHBhbmVsQ2xhc3M6ICd3YXJuJyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgYW5kIGRpc3BsYXlzIGEgc25hY2tiYXIgbm90aWZpY2F0aW9uXG4gICAqIGlmIGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBwcmltYXJ5IG1lc3NhZ2UgdG8gbG9nIGFuZCBkaXNwbGF5LlxuICAgKiBAcGFyYW0gey4uLnVua25vd25bXX0gcmVzdE9mRXJyb3IgLSBBZGRpdGlvbmFsIHZhbHVlcyBvciBlcnJvciBvYmplY3RzXG4gICAqIHRvIGxvZy5cbiAgICovXG4gIGVycm9yKHZhbHVlOiBzdHJpbmcsIC4uLnJlc3RPZkVycm9yOiB1bmtub3duW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luRGV2ZWxvcG1lbnRNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYCR7dmFsdWV9OiBgLCByZXN0T2ZFcnJvcik7XG4gICAgfVxuICAgIHRoaXMub3BlblNuYWNrQmFyKHZhbHVlLCAnT0snLCB7IGR1cmF0aW9uOiAwLCBwYW5lbENsYXNzOiAnZXJyb3InIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgTWF0ZXJpYWwgRGVzaWduIHNuYWNrYmFyIG5vdGlmaWNhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgdGV4dCBtZXNzYWdlIHRvIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBhY3Rpb24gLSBPcHRpb25hbCBsYWJlbCBmb3IgdGhlIHNuYWNrYmFyXG4gICAqIGFjdGlvbiBidXR0b24uXG4gICAqIEBwYXJhbSB7TWF0U25hY2tCYXJDb25maWcgfCB1bmRlZmluZWR9IGNvbmZpZyAtIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3JcbiAgICogdGhlIHNuYWNrYmFyLlxuICAgKiBAcmV0dXJuIHtNYXRTbmFja0JhclJlZjxUZXh0T25seVNuYWNrQmFyPn0gQSByZWZlcmVuY2UgdG8gdGhlIHNuYWNrYmFyLlxuICAgKi9cbiAgb3BlblNuYWNrQmFyKFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBhY3Rpb246IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBjb25maWc6IE1hdFNuYWNrQmFyQ29uZmlnIHwgdW5kZWZpbmVkLFxuICApOiBNYXRTbmFja0JhclJlZjxUZXh0T25seVNuYWNrQmFyPiB7XG4gICAgcmV0dXJuIHRoaXMuc25hY2tCYXIub3BlbihtZXNzYWdlLCBhY3Rpb24sIGNvbmZpZyk7XG4gIH1cbn1cbiJdfQ==