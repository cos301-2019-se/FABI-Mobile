/**
 * File Name: role.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_interfaces\role.ts
 * Project Name: fabi-web
 * Created Date: Monday, July 15th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, October 6th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          USERS ROLE (user type)
/**
 *  this object is used to define the role (user type) of the user,
 *  for permissions and privilege purposes mainly
 *
 * @export
 * @enum {number}
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////
export enum Role {
    SuperUser = 'SuperUser',
    ClinicAdmin = 'ClinicAdmin',
    Staff = 'Staff',
    OrganizationAdmin = 'OrganizationAdmin',
    Member = 'Member'
}