import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FormatBytesPipe {
    // This has been copied and slightly modified from firebase-tools-ui
    // eslint-disable-next-line max-len
    // https://github.com/firebase/firebase-tools-ui/blob/8ad31d748f687bbb04b838430c460121f9a8e338/src/components/common/formatBytes.ts
    /**
     * Formats a number by adding commas as thousands separators and
     * limiting to two decimal places.
     *
     * @param {number} num - The number to format.
     * @returns {string} The formatted number as a string.
     */
    formatNumber(num) {
        const parts = num.toFixed(2).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (+parts[1] === 0) {
            return parts[0];
        }
        return parts.join('.');
    }
    /**
     * Converts a number of bytes into a human-readable format with units
     * (e.g., kB, MB, GB).
     *
     * @param {number} bytes - The number of bytes.
     * @returns {string} The formatted byte size representation.
     */
    formatBytes(bytes) {
        const threshold = 1024;
        if (Math.round(bytes) < threshold) {
            return bytes + ' B';
        }
        const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let u = -1;
        let formattedBytes = bytes;
        do {
            formattedBytes /= threshold;
            u++;
        } while (Math.abs(formattedBytes) >= threshold && u < units.length - 1);
        return this.formatNumber(formattedBytes) + ' ' + units[u];
    }
    /**
     * Transforms a value representing bytes into a human-readable formatted string.
     * Accepts both numbers and strings as input.
     *
     * @param {string | number} bytes - The byte value to transform.
     * @returns {string} The formatted string representing the byte size.
     */
    transform(bytes) {
        if (typeof bytes === 'string')
            bytes = Number(bytes);
        return this.formatBytes(bytes);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: FormatBytesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "17.3.3", ngImport: i0, type: FormatBytesPipe, isStandalone: true, name: "formatBytes" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: FormatBytesPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'formatBytes',
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LWJ5dGVzLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZpcmViYXNlLXN0b3JhZ2UtbWFuYWdlci9zcmMvbGliL3BpcGVzL2Zvcm1hdC1ieXRlcy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU1wRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixvRUFBb0U7SUFDcEUsbUNBQW1DO0lBQ25DLG1JQUFtSTtJQUNuSTs7Ozs7O09BTUc7SUFDSCxZQUFZLENBQUMsR0FBVztRQUN0QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFDbEMsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztRQUMzQixHQUFHLENBQUM7WUFDRixjQUFjLElBQUksU0FBUyxDQUFDO1lBQzVCLENBQUMsRUFBRSxDQUFDO1FBQ04sQ0FBQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4RSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsU0FBUyxDQUFDLEtBQXNCO1FBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUFFLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OEdBckRVLGVBQWU7NEdBQWYsZUFBZTs7MkZBQWYsZUFBZTtrQkFKM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdmb3JtYXRCeXRlcycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1hdEJ5dGVzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBUaGlzIGhhcyBiZWVuIGNvcGllZCBhbmQgc2xpZ2h0bHkgbW9kaWZpZWQgZnJvbSBmaXJlYmFzZS10b29scy11aVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmlyZWJhc2UvZmlyZWJhc2UtdG9vbHMtdWkvYmxvYi84YWQzMWQ3NDhmNjg3YmJiMDRiODM4NDMwYzQ2MDEyMWY5YThlMzM4L3NyYy9jb21wb25lbnRzL2NvbW1vbi9mb3JtYXRCeXRlcy50c1xuICAvKipcbiAgICogRm9ybWF0cyBhIG51bWJlciBieSBhZGRpbmcgY29tbWFzIGFzIHRob3VzYW5kcyBzZXBhcmF0b3JzIGFuZFxuICAgKiBsaW1pdGluZyB0byB0d28gZGVjaW1hbCBwbGFjZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBUaGUgbnVtYmVyIHRvIGZvcm1hdC5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBudW1iZXIgYXMgYSBzdHJpbmcuXG4gICAqL1xuICBmb3JtYXROdW1iZXIobnVtOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcnRzID0gbnVtLnRvRml4ZWQoMikuc3BsaXQoJy4nKTtcbiAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csICcsJyk7XG4gICAgaWYgKCtwYXJ0c1sxXSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHBhcnRzWzBdO1xuICAgIH1cbiAgICByZXR1cm4gcGFydHMuam9pbignLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgbnVtYmVyIG9mIGJ5dGVzIGludG8gYSBodW1hbi1yZWFkYWJsZSBmb3JtYXQgd2l0aCB1bml0c1xuICAgKiAoZS5nLiwga0IsIE1CLCBHQikuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBieXRlcyAtIFRoZSBudW1iZXIgb2YgYnl0ZXMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgYnl0ZSBzaXplIHJlcHJlc2VudGF0aW9uLlxuICAgKi9cbiAgZm9ybWF0Qnl0ZXMoYnl0ZXM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgdGhyZXNob2xkID0gMTAyNDtcbiAgICBpZiAoTWF0aC5yb3VuZChieXRlcykgPCB0aHJlc2hvbGQpIHtcbiAgICAgIHJldHVybiBieXRlcyArICcgQic7XG4gICAgfVxuICAgIGNvbnN0IHVuaXRzID0gWydrQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddO1xuICAgIGxldCB1ID0gLTE7XG4gICAgbGV0IGZvcm1hdHRlZEJ5dGVzID0gYnl0ZXM7XG4gICAgZG8ge1xuICAgICAgZm9ybWF0dGVkQnl0ZXMgLz0gdGhyZXNob2xkO1xuICAgICAgdSsrO1xuICAgIH0gd2hpbGUgKE1hdGguYWJzKGZvcm1hdHRlZEJ5dGVzKSA+PSB0aHJlc2hvbGQgJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiB0aGlzLmZvcm1hdE51bWJlcihmb3JtYXR0ZWRCeXRlcykgKyAnICcgKyB1bml0c1t1XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIGEgdmFsdWUgcmVwcmVzZW50aW5nIGJ5dGVzIGludG8gYSBodW1hbi1yZWFkYWJsZSBmb3JtYXR0ZWQgc3RyaW5nLlxuICAgKiBBY2NlcHRzIGJvdGggbnVtYmVycyBhbmQgc3RyaW5ncyBhcyBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudW1iZXJ9IGJ5dGVzIC0gVGhlIGJ5dGUgdmFsdWUgdG8gdHJhbnNmb3JtLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGJ5dGUgc2l6ZS5cbiAgICovXG4gIHRyYW5zZm9ybShieXRlczogc3RyaW5nIHwgbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykgYnl0ZXMgPSBOdW1iZXIoYnl0ZXMpO1xuXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0Qnl0ZXMoYnl0ZXMpO1xuICB9XG5cbn1cbiJdfQ==