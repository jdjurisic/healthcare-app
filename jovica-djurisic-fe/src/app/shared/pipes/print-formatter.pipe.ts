import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printFormatter',
})
export class PrintFormatterPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value ? value.replace(/_/g, ' ') : value;
  }
}
