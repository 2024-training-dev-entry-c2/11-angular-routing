import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defautValue'
})
export class DefautValuePipe implements PipeTransform {

  transform(value: any, defaultValue: string): string {
    return value || defaultValue;
  }
  

}
