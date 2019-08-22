/**
 * File Name: interfaces.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\interfaces.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 22nd 2019
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
    password?: string; // Passsword of Admin
}

/**
 * Defines a Organisation's Member object
 *
 * @export
 * @interface MemberInfo
 */
export interface OrganisationMember {
  id?: string, // ID of the Member
  fname: string, // First Name of Member
  surname: string, // Surname of Member
  email: string, // Email of Member
  password?: string // Password of Member
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
    orgName: string;
    email: string;
    password: string;
}
  
/**
 * Defines a FABI Staff Member object
 *
 * @export
 * @interface StaffInfo
 */
export interface StaffInfo {
  ID?: number,
  fname: string
  surname: string,
  email: string,
  phone?: number,
  position?: string,
}
  
/**
 * Defines a DatabasePrivilege object
 *
 * @export
 * @interface DatabasePrivilege
 */
export interface DatabasePrivilege {
  name: string,
  privileges: string[]
}

/**
 * Defines a PrivilegeTypes object
 *
 * @export
 * @interface PrivilegeTypes
 */
export interface PrivilegeTypes {
  create: boolean,
  retrieve: boolean,
  update: boolean,
  delete: boolean
}

/**
 * Defines a UserPrivileges object
 *
 * @export
 * @interface UserPrivileges
 */
export interface UserPrivileges {
  databases?: DatabasePrivilege[]
}

/**
 * Defines a Confirm object
 *
 * @export
 * @interface Confirm
 */
export interface Confirm {
  title: string,
  message: string,
  info: string,
  cancel: string,
  confirm: string
} 

/**
 * Defines a SampleFormData object
 *
 * @export
 * @interface SampleFormData
 */  
export interface SampleFormData {
  // Sample Details
  sample_plant_species: string,
  sample_num_samples: number,
  date_sample_collected: Date,
  date_sample_sent: Date,

  // Plantation Details
  sample_street: string,
  sample_area: string,
  sample_city: string,
  sample_farm: string,
  sample_province: string,
  sample_gps: string,

  // Type of Sample
  sample_type_soil: string,
  sample_type_stems: string,
  sample_type_roots: string,
  sample_type_twigs: string,
  sample_type_leaves: string,
  sample_type_seedlings: string,
  sample_type_media: string,
  sample_type_water: string,
  sample_type_insect: string,
  sample_type_nuts: string,
  sample_type_other: string,

  // Symptoms
  symptom_wilt: string,
  symptom_stunting: string,
  symptom_leafspot: string,
  symptom_rootrot: string,
  symptom_dieback: string,
  symptom_cankers: string,
  symptom_death: string,
  symptom_wood: string,
  symptom_other: string,

  // Distribution of Symptoms
  distribution_localized: string,
  distributed_scattered: string,
  distributed_general: string,
  distributed_clumps: string,
  distributed_na: string,
  distributed_other: string,
  percentage_plants_affected: string,

  // Conditons
  conditions_date_problem_noticed: Date,
  conditions_date_planted: Date,
  conditions_weather_disturbances: string,
  conditions_weather_prior: string,
  conditions_others: string,
  conditions_additional: string

  // Permissions
  landowner_name: string,
  permission_granted: boolean 
}

/**
 * Defines a Location object
 *
 * @export
 * @interface Location
 */
export interface Location {
  latitude: number,
  longitude: number
}

/**
 * Defines a Address object
 *
 * @export
 * @interface Address
 */
export interface Address {
  street_number?: number,
  street: string,
  estate?: string,
  area?: string,
  city: string,
  province: string,
  country: string,
  postal_code?: string,
  formatted_address: string
}