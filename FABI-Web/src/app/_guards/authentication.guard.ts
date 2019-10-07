/**
 * File Name: authentication.guard.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, September 10th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, October 6th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

/**
 * FOR ACTIVATING COMPONENTS
 *
 * @export
 * @class AuthenticationGuard
 * @implements {CanActivate}
 * @implements {CanActivateChild}
 * @implements {CanLoad}
 */
@core.Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of AuthenticationGuard.
   * @param {Router} router for routing/navigating to other components
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @memberof AuthenticationGuard
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CAN ACTIVATE 
  /**
   * This function is used to test if a user has the permissions/privileges to activate (navigate to) a specific component 
   *
   * @param {ActivatedRouteSnapshot} next route to be activated
   * @param {RouterStateSnapshot} state represents the state of the router at a moment in time.
   * @returns {(Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree)}
   * @memberof AuthenticationGuard
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.authService.getCurrentSessionValue;   // current user

    // if current user exists (user logged into session)
    if (user) {

      // if user does not have permission - return false
      if (next.data.roles && next.data.roles.indexOf(user.user.permission) === -1) {

        this.router.navigate(['/']);
        return false;

      }

      // else - return true
      return true;
    }

    // else rerouted to login page
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

}
