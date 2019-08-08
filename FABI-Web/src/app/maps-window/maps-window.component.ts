import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormControl } from '@angular/forms';
import * as Interface from '../_interfaces/interfaces';
import { MatDialogRef } from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-maps-window',
  templateUrl: './maps-window.component.html',
  styleUrls: ['./maps-window.component.scss']
})
export class MapsWindowComponent implements OnInit {

  public location: Interface.Location = {latitude: 0, longitude: 0};
  public address: Interface.Address = {street: '', city: '', province: '', country: '', formatted_address: ''};
  public zoom: number = 0;
  public infoTitle: string = '';
  public map_type: string = 'roadmap';
  private geocoder: any;
  public isSatellite: string = "0px";

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private dialogRef: MatDialogRef<MapsWindowComponent>, private mapLoader: MapsAPILoader, private ngZone: NgZone) { }

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

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.location.latitude = position.coords.latitude;
          this.location.longitude = position.coords.longitude;
          console.log(this.location.latitude);
          console.log(this.location.longitude);
          this.zoom = 15;
          this.infoTitle = "Current Location";
          this.getAddress(this.location.latitude, this.location.longitude);
        }
      },(error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  selectLocation(event) {
    console.log(event);
    this.location.latitude = event.coords.lat;
    this.location.longitude = event.coords.lng;
    console.log(this.location.latitude);
    console.log(this.location.longitude);
    this.infoTitle = "";
    this.getAddress(this.location.latitude, this.location.longitude);
  }
 

  getAddress(latitude, longitude) {
    this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          let address_details = results[0];

          this.address.formatted_address = address_details.formatted_address;
          
          address_details.address_components.forEach(component => {
            if(component.types[0] == "street_number") {
              this.address.street_number = component.long_name;

            } else if(component.types[0] == "route") {
              this.address.street = component.long_name;

            } else if(component.types[0] == "sublocality" || component.types[0] == "political") {
                
              if(component.types[1] == "sublocality") {
                this.address.area = component.long_name;
              }

            } else if(component.types[0] == "locality") {
              this.address.city = component.long_name;
              
            } else if(component.types[0] == "administrative_area_level_1") {
              this.address.province = component.long_name;
              
            } else if(component.types[0] == "country") {
              this.address.country = component.long_name;
              
            } else if(component.types[0] == "postal_code") {
              this.address.postal_code = component.long_name;
            }
          });

          console.log("ADDRESS: " + JSON.stringify(this.address));
          this.zoom = 15;
        } else {
          window.alert('No results found for location address');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  changeMapType() {
    
    if(this.map_type = 'roadmap') {
      this.map_type = 'hybrid';
      this.isSatellite = "2px";

    } else {
      this.map_type = 'roadmap';
      this.isSatellite = "0px";
    }

  }

  select() {
    this.dialogRef.close( 
      {
        'address': this.address, 
        'location': this.location
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }

}
