/**
 * File Name: interfaces.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\interfaces.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, June 25th 2019
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
    ID?: string; // ID of Organisation 
    orgName: string; // Name of Organisation
    admin?: OrganisationAdmin; // Admin of Organisation
}

/**
 * Defines an Admin of an Organisation
 *
 * @export
 * @interface OrganisationAdmin
 */
export interface OrganisationAdmin {
    fname: string;  // First Name of Admin
    surname: string; // Surname of Admin
    email: string; // Email of Admin
    password: string; // Passsword of Admin
}

/**
 * Defines a Organisation's Member object
 *
 * @export
 * @interface MemberInfo
 */
export interface OrganisationMember {
  ID?: string, // ID of the Member
  fname: string, // First Name of Member
  surname: string, // Surname of Member
  email: string, // Email of Member
  password: string // Password of Member
}

/**
 * Defines a User Type object
 *
 * @export
 * @interface UserType
 */
export interface UserType {
    ID: number; // ID of the User Type
    Name: string; // Name of the User Type
}

/**
 * Defines the User's Login Information
 *
 * @export
 * @interface LoginInfo
 */
export interface LoginInfo {
    email: string;
    userType: string,
    orgName: string,
    password: string;
}
  
/**
 * Defines a FABI Staff Member object
 *
 * @export
 * @interface StaffInfo
 */
export interface StaffInfo {
    name: string;
    surname: string,
    email: string,
    phone: number,
    position: string
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