/**
 * File Name: filter-pipe.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_services\filter-pipe.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, August 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Friday, August 16th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items || !value) {
      return items;
    }

    return items.filter((item: string) => this.applyFilter(item, value));
  }

  applyFilter(field: string, value: string){
    for(var i = 0; i < field.length; i++){
      var array = field[i].split(' ');
      for(var j = 0; j < array.length; j++){
        if(array[j].toLowerCase() == value.toLowerCase()){
          return true;
        }
      }
    }

    return false;
  }
}