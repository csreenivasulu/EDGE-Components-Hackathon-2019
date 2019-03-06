import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterColumn',
  pure: false
})
export class FilterColumnPipe implements PipeTransform {

  /**
   * @items table information
   * @filter key and selected data Ex: {id: 1, name: "a"}
   * transform is unimplememted method or Pipetransform.
   * items is the selected based on the filter.
   * */
  transform(items, filter: { [key: string]: any }) {
    if (!items) return null;
    if (!filter) return items;
    return items.filter(item => {
      let value = true;
      Object.keys(filter).forEach(ele => {
        if (value) {
          value = JSON.stringify(item[ele]).toLowerCase().indexOf(filter[ele].toLowerCase()) > -1;
        }
      });
      return value;
    });
  }
}
