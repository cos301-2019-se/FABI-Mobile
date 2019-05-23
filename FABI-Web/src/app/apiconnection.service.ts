import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const LoginUrl: string = 'https://fabi-web-app.herokuapp.com/authenticatePublicUser';
const signupUrl: string = 'https://fabi-web-app.herokuapp.com/addPublicUser';
const formUrl: string = 'https://fabi-web-app.herokuapp.com/submitForm';


export interface LoginInfo {
  email: string;
  password: string;
}

interface UserInfo {
  loggedIn: boolean;
}

export interface FormData {
  name: string;
}

export interface LoginData {
  code: string;
  title: string;
  message: string;
  result: string;
}

export interface Error {
  code: string;
  title: string;
  message: string;
}

export interface SignupFormData {
  name: string;
  company: string;
  address: string;
  email: string;
  phone: string;
  password: string;
}

export interface ClientFormData {
  name: string;
  company: string;
  address: string;
  contact: string;
  email: string;
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
  landowner: string;
  landowner_signature: string;
}

@Injectable({
  providedIn: 'root'
})
export class APIconnectionService {
  private returnValue: LoginData;
  private err: Error;
  private authentication: UserInfo;
  loggedIn: boolean = false; 
  sent: boolean = false;

  constructor(private http: HttpClient) { }
  submitClientForm(data: FormData) {
    console.log(data);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setLogin(){
    this.loggedIn = true;
  }

  isSent() {
    return this.sent;
  }

  setSent(){
    this.sent = true;
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           SIGNUP
  /**
   * @description Send a POST request to the API to create a user on the system.
   *              Will be changed to only be accessablie by admin users
   * @param SignupFormData info retrieved stored in a JSON object.
   */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  signUp(info: SignupFormData) {
    //info.password = this.SHA1(info.password);

    const options = {
      method: 'POST',
      url: signupUrl,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body : info,
      json: true
    };
    console.log(options);

    return this.http.request('POST', LoginUrl, options);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           LOGIN
  /**
   * @description Send a POST request to the API to authenticate a user.
   * @param LoginInfo username and email of client in a JSON object.
   */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  login(info: LoginInfo) {
    // info.password = this.SHA1(info.password);
    const options = {
      method: 'POST',
      url: LoginUrl,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body : info,
      json: true
    };
    console.log(options);

    return this.http.request('POST', LoginUrl, options);

  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           SUBMIT CLIENT FORM
  /**
   * @description Send a POST request to the API to submit form data submitted by a client
   * @param ClientFormData : data submitted by client form in a JSON object
   */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitForm(info: ClientFormData) {
    const options = {
      method: 'POST',
      url: formUrl,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body : info,
      json: true
    };
    console.log(options);

    return this.http.request('POST', formUrl, options);
  }


  /**
   *
   *  Secure Hash Algorithm (SHA1)
   *  http://www.webtoolkit.info/
   *
   **/

  SHA1(msg) {

    function rotate_left(n,s) {
      var t4 = ( n<<s ) | (n>>>(32-s));
      return t4;
    };

    function lsb_hex(val) {
      var str="";
      var i;
      var vh;
      var vl;

      for( i=0; i<=6; i+=2 ) {
        vh = (val>>>(i*4+4))&0x0f;
        vl = (val>>>(i*4))&0x0f;
        str += vh.toString(16) + vl.toString(16);
      }
      return str;
    };

    function cvt_hex(val) {
      var str="";
      var i;
      var v;

      for( i=7; i>=0; i-- ) {
        v = (val>>>(i*4))&0x0f;
        str += v.toString(16);
      }
      return str;
    };


    function Utf8Encode(string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }

      }

      return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
      j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
      word_array.push( j );
    }

    switch( msg_len % 4 ) {
      case 0:
        i = 0x080000000;
        break;
      case 1:
        i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
        break;

      case 2:
        i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
        break;

      case 3:
        i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
        break;
    }

    word_array.push( i );

    while( (word_array.length % 16) != 14 ) word_array.push( 0 );

    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );


    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {

      for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
      for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;

      for( i= 0; i<=19; i++ ) {
        temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }

      for( i=20; i<=39; i++ ) {
        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }

      for( i=40; i<=59; i++ ) {
        temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }

      for( i=60; i<=79; i++ ) {
        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }

      H0 = (H0 + A) & 0x0ffffffff;
      H1 = (H1 + B) & 0x0ffffffff;
      H2 = (H2 + C) & 0x0ffffffff;
      H3 = (H3 + D) & 0x0ffffffff;
      H4 = (H4 + E) & 0x0ffffffff;

    }

    temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();

  }

}
