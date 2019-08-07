import { Injectable } from '@angular/core';
import * as Interface from '../_interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private geocoder: any;

  constructor() { }

}
