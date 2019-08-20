/**
 * File Name: filter.pipe.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_services\filter.pipe.ts
 * Project Name: fabi-web
 * Created Date: Friday, August 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, August 20th 2019
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

  transform(items: any[], type: string, value: string): any[] {
    if (!items || !value) {
      return items;
    }

    if(type == "reporting"){
      return items.filter((item: string) => this.applyFilter(item, value));
    }
    else if(type == "admin-dashboard"){
      return items.filter((item: string) => this.adminFilter(item, value));
    }
    else if(type == "database"){
      return items.filter((item: string) => this.databaseFilter(item, value));
    }
    else if(type == "databaseView"){
      return items.filter((item: string) => this.databaseViewFilter(item, value));
    }
    else if(type == "clinicAdmin"){
      return items.filter((item: string) => this.clinicAdminFilter(item, value));
    }
    else if(type == "organizations"){
      return items.filter((item: string) => this.organizationsFilter(item, value));
    }
    else if(type == "samples"){
      return items.filter((item: string) => this.sampleFilter(item, value));
    }
    else if(type == "members"){
      return items.filter((item: string) => this.memberFilter(item, value));
    }
    else if(type == "staffSamples"){
      return items.filter((item: string) => this.staffSamplesFilter(item, value));
    }
    else if(type == "deposits"){
      return items.filter((item: string) => this.depositsFilter(item, value));
    }
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

  adminFilter(field: any, value: string){
    if(field.fname.toLowerCase() == value.toLowerCase()){
      return true;
    }
    
    if(field.surname.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.email.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }

  databaseFilter(field: any, value: string){
    if(field.name.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }

  databaseViewFilter(field: any, value: string){
    if(field.species.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.id.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.num.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }

  clinicAdminFilter(field: any, value: string){
    if(field.referenceNumber.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.orgName.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.userID.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.status.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }

  organizationsFilter(field: any, value: string){
    if(field.orgName.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }

  sampleFilter(field: any, value: string){
    if(field.referenceNumber.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.userID.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.status.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }

  memberFilter(field: any, value: string){
    if(field.referenceNumber.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.status.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }

  staffSamplesFilter(field: any, value: string){
    if(field.referenceNumber.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.status.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.dateSubmitted.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }

  depositsFilter(field: any, value: string){
    if(field.cultureNumber.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.name.toLowerCase() == value.toLowerCase()){
      return true;
    }

    if(field.dateSubmitted.toLowerCase() == value.toLowerCase()){
      return true;
    }

    return false;
  }
}