import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { registerContentQuery } from '@angular/core/src/render3';
import { StaticInjector } from '@angular/core/src/di/injector';
import { BehaviorSubject } from 'rxjs';

//Globals variables used to hold the API call urls
const getAllSamplesURL = '***REMOVED***/retrieveAllSamples';

@Injectable({
    providedIn: 'root'
})

export class DiagnosticClinicAPIService {

   constructor(private http: HttpClient) { }

   /*
        This function sends a POST request to the API to retrieve a list containing
        all the samples that FABI is currently processing
   */
   getAllSamples(){
        const options = {
            method: 'POST',
            url: getAllSamplesURL,
            headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            json: true
        };

        return this.http.request('POST', getAllSamplesURL, options);
   }

}