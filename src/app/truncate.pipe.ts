import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: String, maxLength: number = 20): String {
    if(value.includes("**")){
      value = value.split('**')[1]
    }
    if (!value) return '';
    return value.length > maxLength ? value.slice(0, maxLength) + '…' : value;
  }
}