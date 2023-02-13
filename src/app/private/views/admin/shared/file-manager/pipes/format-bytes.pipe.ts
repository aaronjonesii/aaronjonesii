import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatBytes'})
export class FormatBytesPipe implements PipeTransform {
  // This has been copied and slightly modified from firebase-tools-ui
  // https://github.com/firebase/firebase-tools-ui/blob/8ad31d748f687bbb04b838430c460121f9a8e338/src/components/common/formatBytes.ts
  formatNumber(num: number) {
    let parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (+parts[1] === 0) {
      return parts[0];
    }
    return parts.join('.');
  };

  formatBytes(bytes: number) {
    const threshold = 1000;
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
  };


  transform(bytes: string | number, decimals = 2): string {
    if (typeof bytes === 'string') bytes = Number(bytes);

    return this.formatBytes(bytes);
  }

}
