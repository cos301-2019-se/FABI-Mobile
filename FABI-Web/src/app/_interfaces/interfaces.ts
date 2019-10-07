/**
 * File Name: interfaces.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, October 6th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

/////////////////////////////////////////////////////
//                  ORGANIZATION
/**
 * Defines an Organisation object
 *
 * @export
 * @interface Organisation
 */
/**
 *
 *
 * @export
 * @interface Organisation
 */
export interface Organisation {
  ID?: string;                                //The id of Organisation 
  orgName: string;                            //The name of Organisation
  admin?: OrganisationAdmin;                  //The admin of Organisation
}


/////////////////////////////////////////////////////
//              ORGANIZATION ADMIN
/**
 * Defines an Admin of an Organisation
 *
 * @export
 * @interface OrganisationAdmin
 */
/////////////////////////////////////////////////////
export interface OrganisationAdmin {
  fname: string;                              //The first name of Admin
  surname: string;                            //The surname of Admin
  email: string;                              //The email of Admin
  phone?: number;                             //The phone number of Admin
  password?: string;                          //The passsword of Admin
}


/////////////////////////////////////////////////////
//            ORGANIZATION MEMBER
/**
 * Defines a Organisation's Member object
 *
 * @export
 * @interface MemberInfo
 */
/////////////////////////////////////////////////////
export interface OrganisationMember {
  id?: string,                                  //The id of the Member
  fname: string,                                //The first name of Member
  surname: string,                              //The surname of Member
  email: string,                                //The email of Member
  phone?: number;                               //The phone number of Member
  password?: string                             //The password of Member
}


/////////////////////////////////////////////////////
//                  USER TYPE
/**
 * Defines a User Type object
 *
 * @export
 * @interface UserType
 */
/////////////////////////////////////////////////////
export interface UserType {
  ID: number;                                 //The id of the User Type
  Name: string;                               //The name of the User Type
}


/////////////////////////////////////////////////////
//                LOGIN INFO
/**
 * Defines the User's Login Information
 *
 * @export
 * @interface LoginInfo
 */
/////////////////////////////////////////////////////
export interface LoginInfo {
  orgName: string;                            //The organization fo teh user currently logged in
  email: string;                              //The email of the suer currently logged in
  password: string;                           //The password of the user currently logged in
}


/////////////////////////////////////////////////////
//                 STAFF INFO
/**
 * Defines a FABI Staff Member object
 *
 * @export
 * @interface StaffInfo
 */
/////////////////////////////////////////////////////
export interface StaffInfo {
  ID?: number,                                  //The id number of the staff member
  fname: string                                 //The first name of the staff member
  surname: string,                              //The surname of the staff member
  email: string,                                //The email address fo the staff member
  phone?: number,                               //The phone number of the staff member
  position?: string,                            //The positions of the staff member
}












/////////////////////////////////////////////////////
//            DATABASE PRIVILEGE
/**
 * Defines a DatabasePrivilege object
 *
 * @export
 * @interface DatabasePrivilege
 */
/////////////////////////////////////////////////////
export interface DatabasePrivilege {
  name: string,                                 //The database's name
  privileges: string[]                          //The privileges for the database                          
}


/////////////////////////////////////////////////////
//                PRIVILEGE TYPES
/**
 * Defines a PrivilegeTypes object
 *
 * @export
 * @interface PrivilegeTypes
 */
/////////////////////////////////////////////////////
export interface PrivilegeTypes {
  create: boolean,                              //The create privilege
  retrieve: boolean,                            //The retrieve privilege
  update: boolean,                              //The update privilege
  delete: boolean                               //The delete privilege
}


/////////////////////////////////////////////////////
//              USER'S PRIVILEGES
/**
 * Defines a UserPrivileges object
 *
 * @export
 * @interface UserPrivileges
 */
/////////////////////////////////////////////////////
export interface UserPrivileges {
  databases?: DatabasePrivilege[]               //The database privileges for a database
}










/////////////////////////////////////////////////////
//            CONFIRM (for confirm pop-up)
/**
 * Defines a Confirm object
 *
 * @export
 * @interface Confirm
 */
/////////////////////////////////////////////////////
export interface Confirm {
  title: string,                                //The confirm title
  message: string,                              //The confirm message
  info: string,                                 //The confirm information
  cancel: string,                               //If it has been canceled or not
  confirm: string                               //If it has been confirmed or not
}











/////////////////////////////////////////////////////
//                  SAMPLE FORM
/**
 * Defines a SampleFormData object
 *
 * @export
 * @interface SampleFormData
 */
/////////////////////////////////////////////////////
export interface SampleFormData {
  // Sample Details
  sample_details: {
    plant_species: string,                 //The species of the sample
    plant_genus: string                    //The genus of the sample
    num_samples: number,                   //The number of samples
    date_collected: Date,                  //The date that the sample was collected
    date_sent: Date,                       //The date that the sample was sent
  }

  // Plantation Details
  plantation_details: {
    street: string,                        //The street name
    area: string,                          //The area
    city: string,                          //The city 
    farm: string,                          //The farm name
    province: string,                      //The province
    gps: string,                           //Sample GPS coordinates
  }

  // Type of Sample
  types: string[],
  // types: {
  //   soil: boolean,                     //Soil sample type
  //   stems: boolean,                    //Stems sample type
  //   roots: boolean,                    //Roots sample type
  //   twigs: boolean,                    //Twigs sample type
  //   leaves: boolean,                   //Leaves sample type
  //   seedlings: boolean,                //Seedlings sample type
  //   media: boolean,                    //Media sample type
  //   water: boolean,                    //Water sample type
  //   insect: boolean,                   //Insect sample type
  //   nuts: boolean,                     //Nuts sample type
  //   other: boolean,                    //Other type of sample (if any)
  // }

  // Symptoms
  symptoms: {
    wilt: boolean,                         //Wilt symptom
    stunting: boolean,                     //Stunting symptom
    leafspot: boolean,                     //Leafspot symptom
    rootrot: boolean,                      //Rootrot symptom
    dieback: boolean,                      //Dieback symptom
    cankers: boolean,                      //Cankers symptom 
    death: boolean,                        //Death symptom 
    wood: boolean,                         //Wood symptom
    other: boolean,                        //Other symptoms (if any)
  }

  // Distribution of Symptoms
  distribution: {
    localized: boolean,               //The localized distribution
    scattered: boolean,                //The scattered distribution
    general: boolean,                  //The general distribution
    clumps: boolean,                   //The clumps distribution
    na: boolean,                       //The na distribution
    other: boolean,                    //Other distributions (if any)
    percentage_plants_affected: number,           //The percentage of plants affected
  }

  // Conditons
  conditions: {
    date_problem_noticed: Date,        //The date the problem was noticed
    date_planted: Date,                //The date the plants were planted
    weather_disturbances: string,      //The weather disturbances
    weather_prior: string,             //The weather conditions prior
    others: string,                    //Other weather conditions (if any)
    additional?: string                 //Additional weather conditions (if any)
  }

  // Permissions
  permissions: {
    landowner_name: string,                       //The landowner's name
    permission_granted: boolean                   //Whether or not the landowner has granted permission
  }
}













/////////////////////////////////////////////////////
//                  LOCATION
/**
 * Defines a Location object
 *
 * @export
 * @interface Location
 */
/////////////////////////////////////////////////////
export interface Location {
  latitude: number,                             //The latitude of the location
  longitude: number                             //The longitude of the location
}


/////////////////////////////////////////////////////
//                     ADDRESS
/**
 * Defines a Address object
 *
 * @export
 * @interface Address
 */
/////////////////////////////////////////////////////
export interface Address {
  street_number?: number,                       //The street number of the address (if any)
  street: string,                               //The street name of the address
  estate?: string,                              //The estate of the address (if any)
  area?: string,                                //The area of the address (if any)
  city: string,                                 //The city of the address
  province: string,                             //The province of the address
  country: string,                              //The country of the address
  postal_code?: string,                         //The postal code of the address (if any)
  formatted_address: string                     //The formatted address
}

































