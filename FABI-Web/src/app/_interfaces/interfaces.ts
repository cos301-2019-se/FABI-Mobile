/**
 * File Name: interfaces.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\interfaces.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, August 26th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */
 
/**
 * Defines an Organisation object
 *
 * @export
 * @interface Organisation
 */
export interface Organisation {
    ID?: string;                                //The id of Organisation 
    orgName: string;                            //The name of Organisation
    admin?: OrganisationAdmin;                  //The admin of Organisation
}

/**
 * Defines an Admin of an Organisation
 *
 * @export
 * @interface OrganisationAdmin
 */
export interface OrganisationAdmin {
    fname: string;                              //The first name of Admin
    surname: string;                            //The surname of Admin
    email: string;                              //The email of Admin
    phone?: number;                             //The phone number of Admin
    password?: string;                          //The passsword of Admin
}

/**
 * Defines a Organisation's Member object
 *
 * @export
 * @interface MemberInfo
 */
export interface OrganisationMember {
  id?: string,                                  //The id of the Member
  fname: string,                                //The first name of Member
  surname: string,                              //The surname of Member
  email: string,                                //The email of Member
  phone?: number;                               //The phone number of Member
  password?: string                             //The password of Member
}

/**
 * Defines a User Type object
 *
 * @export
 * @interface UserType
 */
export interface UserType {
    ID: number;                                 //The id of the User Type
    Name: string;                               //The name of the User Type
}

/**
 * Defines the User's Login Information
 *
 * @export
 * @interface LoginInfo
 */
export interface LoginInfo {
    orgName: string;                            //The organization fo teh user currently logged in
    email: string;                              //The email of the suer currently logged in
    password: string;                           //The password of the user currently logged in
}
  
/**
 * Defines a FABI Staff Member object
 *
 * @export
 * @interface StaffInfo
 */
export interface StaffInfo {
  ID?: number,                                  //The id number of the staff member
  fname: string                                 //The first name of the staff member
  surname: string,                              //The surname of the staff member
  email: string,                                //The email address fo the staff member
  phone?: number,                               //The phone number of the staff member
  position?: string,                            //The positions of the staff member
}
  
/**
 * Defines a DatabasePrivilege object
 *
 * @export
 * @interface DatabasePrivilege
 */
export interface DatabasePrivilege {
  name: string,                                 //The database's name
  privileges: string[]                          //The privileges for the database                          
}

/**
 * Defines a PrivilegeTypes object
 *
 * @export
 * @interface PrivilegeTypes
 */
export interface PrivilegeTypes {
  create: boolean,                              //The create privilege
  retrieve: boolean,                            //The retrieve privilege
  update: boolean,                              //The update privilege
  delete: boolean                               //The delete privilege
}

/**
 * Defines a UserPrivileges object
 *
 * @export
 * @interface UserPrivileges
 */
export interface UserPrivileges {
  databases?: DatabasePrivilege[]               //The database privileges for a database
}

/**
 * Defines a Confirm object
 *
 * @export
 * @interface Confirm
 */
export interface Confirm {
  title: string,                                //The confirm title
  message: string,                              //The confirm message
  info: string,                                 //The confirm information
  cancel: string,                               //If it has been canceled or not
  confirm: string                               //If it has been confirmed or not
} 

/**
 * Defines a SampleFormData object
 *
 * @export
 * @interface SampleFormData
 */  
export interface SampleFormData {
  // Sample Details
  sample_plant_species: string,                 //The species of the sample
  sample_num_samples: number,                   //The number of samples
  date_sample_collected: Date,                  //The date that the sample was collected
  date_sample_sent: Date,                       //The date that the sample was sent

  // Plantation Details
  sample_street: string,                        //The street name
  sample_area: string,                          //The area
  sample_city: string,                          //The city 
  sample_farm: string,                          //The farm name
  sample_province: string,                      //The province
  sample_gps: string,                           //Sample GPS coordinates

  // Type of Sample
  sample_type_soil: string,                     //Soil sample type
  sample_type_stems: string,                    //Stems sample type
  sample_type_roots: string,                    //Roots sample type
  sample_type_twigs: string,                    //Twigs sample type
  sample_type_leaves: string,                   //Leaves sample type
  sample_type_seedlings: string,                //Seedlings sample type
  sample_type_media: string,                    //Media sample type
  sample_type_water: string,                    //Water sample type
  sample_type_insect: string,                   //Insect sample type
  sample_type_nuts: string,                     //Nuts sample type
  sample_type_other: string,                    //Other type of sample (if any)

  // Symptoms
  symptom_wilt: string,                         //Wilt symptom
  symptom_stunting: string,                     //Stunting symptom
  symptom_leafspot: string,                     //Leafspot symptom
  symptom_rootrot: string,                      //Rootrot symptom
  symptom_dieback: string,                      //Dieback symptom
  symptom_cankers: string,                      //Cankers symptom 
  symptom_death: string,                        //Death symptom 
  symptom_wood: string,                         //Wood symptom
  symptom_other: string,                        //Other symptoms (if any)

  // Distribution of Symptoms
  distribution_localized: string,               //The localized distribution
  distributed_scattered: string,                //The scattered distribution
  distributed_general: string,                  //The general distribution
  distributed_clumps: string,                   //The clumps distribution
  distributed_na: string,                       //The na distribution
  distributed_other: string,                    //Other distributions (if any)
  percentage_plants_affected: string,           //The percentage of plants affected

  // Conditons
  conditions_date_problem_noticed: Date,        //The date the problem was noticed
  conditions_date_planted: Date,                //The date the plants were planted
  conditions_weather_disturbances: string,      //The weather disturbances
  conditions_weather_prior: string,             //The weather conditions prior
  conditions_others: string,                    //Other weather conditions (if any)
  conditions_additional: string                 //Additional weather conditions (if any)

  // Permissions
  landowner_name: string,                       //The landowner's name
  permission_granted: boolean                   //Whether or not the landowner has granted permission
}

/**
 * Defines a Location object
 *
 * @export
 * @interface Location
 */
export interface Location {
  latitude: number,                             //The latitude of the location
  longitude: number                             //The longitude of the location
}

/**
 * Defines a Address object
 *
 * @export
 * @interface Address
 */
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