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
     * @return {string} The formatted number as a string.
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
     * @return {string} The formatted byte size representation.
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
     * Transforms a value representing bytes into a human-readable formatted
     * string. Accepts both numbers and strings as input.
     *
     * @param {string | number} bytes - The byte value to transform.
     * @return {string} The formatted string representing the byte size.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LWJ5dGVzLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZpcmViYXNlLXN0b3JhZ2UtbWFuYWdlci9zcmMvbGliL3BpcGVzL2Zvcm1hdC1ieXRlcy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU1wRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixvRUFBb0U7SUFDcEUsbUNBQW1DO0lBQ25DLG1JQUFtSTtJQUNuSTs7Ozs7O09BTUc7SUFDSCxZQUFZLENBQUMsR0FBVztRQUN0QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFDbEMsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztRQUMzQixHQUFHLENBQUM7WUFDRixjQUFjLElBQUksU0FBUyxDQUFDO1lBQzVCLENBQUMsRUFBRSxDQUFDO1FBQ04sQ0FBQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4RSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsU0FBUyxDQUFDLEtBQXNCO1FBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUFFLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OEdBckRVLGVBQWU7NEdBQWYsZUFBZTs7MkZBQWYsZUFBZTtrQkFKM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdmb3JtYXRCeXRlcycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1hdEJ5dGVzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBUaGlzIGhhcyBiZWVuIGNvcGllZCBhbmQgc2xpZ2h0bHkgbW9kaWZpZWQgZnJvbSBmaXJlYmFzZS10b29scy11aVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmlyZWJhc2UvZmlyZWJhc2UtdG9vbHMtdWkvYmxvYi84YWQzMWQ3NDhmNjg3YmJiMDRiODM4NDMwYzQ2MDEyMWY5YThlMzM4L3NyYy9jb21wb25lbnRzL2NvbW1vbi9mb3JtYXRCeXRlcy50c1xuICAvKipcbiAgICogRm9ybWF0cyBhIG51bWJlciBieSBhZGRpbmcgY29tbWFzIGFzIHRob3VzYW5kcyBzZXBhcmF0b3JzIGFuZFxuICAgKiBsaW1pdGluZyB0byB0d28gZGVjaW1hbCBwbGFjZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBUaGUgbnVtYmVyIHRvIGZvcm1hdC5cbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIG51bWJlciBhcyBhIHN0cmluZy5cbiAgICovXG4gIGZvcm1hdE51bWJlcihudW06IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgcGFydHMgPSBudW0udG9GaXhlZCgyKS5zcGxpdCgnLicpO1xuICAgIHBhcnRzWzBdID0gcGFydHNbMF0ucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcbiAgICBpZiAoK3BhcnRzWzFdID09PSAwKSB7XG4gICAgICByZXR1cm4gcGFydHNbMF07XG4gICAgfVxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBudW1iZXIgb2YgYnl0ZXMgaW50byBhIGh1bWFuLXJlYWRhYmxlIGZvcm1hdCB3aXRoIHVuaXRzXG4gICAqIChlLmcuLCBrQiwgTUIsIEdCKS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGJ5dGVzIC0gVGhlIG51bWJlciBvZiBieXRlcy5cbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGJ5dGUgc2l6ZSByZXByZXNlbnRhdGlvbi5cbiAgICovXG4gIGZvcm1hdEJ5dGVzKGJ5dGVzOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRocmVzaG9sZCA9IDEwMjQ7XG4gICAgaWYgKE1hdGgucm91bmQoYnl0ZXMpIDwgdGhyZXNob2xkKSB7XG4gICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xuICAgIH1cbiAgICBjb25zdCB1bml0cyA9IFsna0InLCAnTUInLCAnR0InLCAnVEInLCAnUEInLCAnRUInLCAnWkInLCAnWUInXTtcbiAgICBsZXQgdSA9IC0xO1xuICAgIGxldCBmb3JtYXR0ZWRCeXRlcyA9IGJ5dGVzO1xuICAgIGRvIHtcbiAgICAgIGZvcm1hdHRlZEJ5dGVzIC89IHRocmVzaG9sZDtcbiAgICAgIHUrKztcbiAgICB9IHdoaWxlIChNYXRoLmFicyhmb3JtYXR0ZWRCeXRlcykgPj0gdGhyZXNob2xkICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIoZm9ybWF0dGVkQnl0ZXMpICsgJyAnICsgdW5pdHNbdV07XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyBhIHZhbHVlIHJlcHJlc2VudGluZyBieXRlcyBpbnRvIGEgaHVtYW4tcmVhZGFibGUgZm9ybWF0dGVkXG4gICAqIHN0cmluZy4gQWNjZXB0cyBib3RoIG51bWJlcnMgYW5kIHN0cmluZ3MgYXMgaW5wdXQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyfSBieXRlcyAtIFRoZSBieXRlIHZhbHVlIHRvIHRyYW5zZm9ybS5cbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGJ5dGUgc2l6ZS5cbiAgICovXG4gIHRyYW5zZm9ybShieXRlczogc3RyaW5nIHwgbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykgYnl0ZXMgPSBOdW1iZXIoYnl0ZXMpO1xuXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0Qnl0ZXMoYnl0ZXMpO1xuICB9XG59XG4iXX0=