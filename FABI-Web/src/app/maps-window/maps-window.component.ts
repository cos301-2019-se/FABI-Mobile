/**
 * File Name: maps-window.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\maps-window\maps-window.component.ts
 * Project Name: fabi-web
 * Created Date: Wednesday, August 14th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, October 10th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { MapsAPILoader } from '@agm/core';
import * as core from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as Interface from '../_interfaces/interfaces';

/** Global declaration of 'google' so that it can be used throught this page - @type {any} */
declare var google: any;

@core.Component({
  selector: 'app-maps-window',
  templateUrl: './maps-window.component.html',
  styleUrls: ['./maps-window.component.scss']
})
export class MapsWindowComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** The location in longitude and latitude - @type {Interface.Location} */
  public location: Interface.Location = { latitude: 0, longitude: 0 };
  /** The address that contains the street name, city, province, and country - @type {Interface.Address} */
  public address: Interface.Address = { street: '', city: '', province: '', country: '', formatted_address: '' };
  /** The zoom of the displayed map - @type {number} */
  public zoom: number = 0;
  public infoTitle: string = '';
  /** The type of the map - @type {string} */
  public map_type: string = 'roadmap';
  private geocoder: any;
  public isSatellite: string = "0px";

  /** A reference to the 'search' element in the HTML page - @type {ElementRef} */
  @core.ViewChild('search') public searchElementRef: core.ElementRef;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of MapsWindowComponent.
   * 
   * @param {MatDialogRef<MapsWindowComponent>} dialogRef
   * @param {MapsAPILoader} mapLoader
   * @param {core.NgZone} ngZone
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private dialogRef: MatDialogRef<MapsWindowComponent>,
    private mapLoader: MapsAPILoader,
    private ngZone: core.NgZone) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.mapLoader.load().then(() => {

      this.setCurrentLocation();

      this.geocoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.location.latitude = place.geometry.location.lat();
          this.location.longitude = place.geometry.location.lng();
          this.zoom = 15;
          this.infoTitle = "";
          this.getAddress(this.location.latitude, this.location.longitude);
        });
      });
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      GET CURRENT LOCATION  
  /**
   * This function is used to set the current location in the map. (When map loads)
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.location.latitude = position.coords.latitude;
          this.location.longitude = position.coords.longitude;
          this.zoom = 15;
          this.infoTitle = "Current Location";
          this.getAddress(this.location.latitude, this.location.longitude);
        }
      }, (error: PositionError) => {
        
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         SET LOCATION
  /**
   * This function is used to change to location based on the user pinning the map
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectLocation(event) {
    this.location.latitude = event.coords.lat;
    this.location.longitude = event.coords.lng;
    this.infoTitle = "";
    this.getAddress(this.location.latitude, this.location.longitude);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET ADDRESS  
  /**
   * This function is used to get the address based on the longitude and latitude provided.
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAddress(latitude, longitude) {
    this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          let address_details = results[0];

          this.address.formatted_address = address_details.formatted_address;

          address_details.address_components.forEach(component => {
            if (component.types[0] == "street_number") {
              this.address.street_number = component.long_name;

            } else if (component.types[0] == "route") {
              this.address.street = component.long_name;

            } else if (component.types[0] == "sublocality" || component.types[0] == "political") {

              if (component.types[1] == "sublocality") {
                this.address.area = component.long_name;
              }

            } else if (component.types[0] == "locality") {
              this.address.city = component.long_name;

            } else if (component.types[0] == "administrative_area_level_1") {
              this.address.province = component.long_name;

            } else if (component.types[0] == "country") {
              this.address.country = component.long_name;

            } else if (component.types[0] == "postal_code") {
              this.address.postal_code = component.long_name;
            }
          });
          this.zoom = 15;
        } else {
          window.alert('No results found for location address');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         CHANGE MAP TYPE
  /**
   * This function is used to change the map type of the map being displayed.
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  changeMapType() {

    if (this.map_type == 'roadmap') {
      this.map_type = 'hybrid';
      this.isSatellite = "2px";

    } else {
      this.map_type = 'roadmap';
      this.isSatellite = "0px";
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         SELECT 
  /**
   * This function saves the changes when the user *selects* to confirm location. It sends the location details back to the component
   *  that called it.
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  select() {
    this.dialogRef.close(
      {
        'address': this.address,
        'location': this.location
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         CANCEL 
  /**
   * This function *cancels* the proccess and closes the dialog
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  cancel() {
    this.dialogRef.close();
  }

}
