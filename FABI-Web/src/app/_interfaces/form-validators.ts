/*
 * File Name: form-validators
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\_interfaces\form-validators
 * Project Name: fabi-web
 * Created Date: Saturday, August 17th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Saturday, August 17th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


 export const AdminForm = {
    'admin_name': [
      { type:  'required', message: 'Please enter admin name'}
    ],
    'admin_surname': [
        { type:  'required', message: 'Please enter admin surname'}
    ],
    'surname_email': [
        { type:  'required', message: 'Please enter admin email'},
        { type: 'pattern', message: 'Please enter a valid email' }
    ],
 }

 export const ChangePasswordFormValidators = {
  'current_password': [
    { type: 'required', message: 'Current password required' },
    // { type: 'minlength', message: 'Password must be at least 5 characters long' },
    // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ],
  'new_password': [
    { type: 'required', message: 'New password required' },
    // { type: 'minlength', message: 'Password must be at least 5 characters long' },
    // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ],
  'confirm_password': [
    { type: 'required', message: 'Confirm assword required' },
    { type: 'passwordMatch', message: 'Passwords must match' }
    // { type: 'minlength', message: 'Password must be at least 5 characters long' },
    // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ],
 }

