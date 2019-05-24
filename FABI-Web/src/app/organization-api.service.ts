import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { registerContentQuery } from '@angular/core/src/render3';
import { StaticInjector } from '@angular/core/src/di/injector';
import { BehaviorSubject } from 'rxjs';

const addMemberURL: string = 'https://user-management-dot-api-fabi.appspot.com/addMemberToOrg';
const submitSampleURL: string = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/submitSample';
const retrieveAllOrgSamples: string = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/retrieveAllOrgSamples';



export interface MemberInfo {
  name: string,
  surname: string,
  location: string,
  email: string,
  phone: number
}

export interface OrganizationInfo {
  orgName: string
}

export interface ClientFormData {
  tree_species: string;
  number_samples: string;
  location1: string;
  location2: string;
  compartment: string;
  gps: string;
  date_collection: string;
  date_sent: string;
  type_soil: string;
  type_stems: string;
  type_leaves: string;
  type_roots: string;
  type_twigs: string;
  type_seedlings: string;
  type_media: string;
  type_water: string;
  symptom_wilt: string;
  symptom_stunting: string;
  symptom_leafspot: string;
  symptom_rootrot: string;
  symptom_dieback: string;
  symptom_cankers: string;
  symptom_death: string;
  symptom_wood: string;
  symptom_other: string;
  distribution_localized: string;
  distribution_scattered: string;
  distribution_general: string;
  conditions_affected: string;
  conditions_problem_noticed: string;
  conditions_date_planted: string;
  conditions_weather_disturbance: string;
  conditions_weather_prior: string;
  conditions_other: string;
  conditions_additional: string;
}


@Injectable({
  providedIn: 'root'
})
export class OrganizationApiService {

  constructor(private http: HttpClient) { }

  addOrgMember(orgInfo: OrganizationInfo, memberInfo: MemberInfo)
  {
    const postData = {
      "orgName": orgInfo.orgName,
      "member": memberInfo
    }

    const options = {
      method: 'POST',
      url: addMemberURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', addMemberURL, options);
  }

  submitSampleForm(orgInfo: OrganizationInfo, formDetails: ClientFormData)
  {
    const postData = {
      "orgName": orgInfo.orgName,
      "data": formDetails
    }

    const options = {
      method: 'POST',
      url: submitSampleURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', submitSampleURL, options);
  }

  retrieveAllSamples(orgInfo: OrganizationInfo)
  {
    const postData = {
      "orgName": orgInfo.orgName
    }

    const options = {
      method: 'POST',
      url: retrieveAllOrgSamples,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', retrieveAllOrgSamples, options);
  }



}
