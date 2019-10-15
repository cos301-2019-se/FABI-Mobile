'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">fabi-web documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' : 'data-target="#xs-components-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' :
                                            'id="xs-components-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' }>
                                            <li class="link">
                                                <a href="components/AdminDivComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminDivComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminHelpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminHelpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatabaseHandlerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatabaseHandlerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberHelpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberHelpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberSubmitSampleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberSubmitSampleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationDivComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationDivComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationHelpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationHelpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationSubmitSampleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationSubmitSampleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SampleDivComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleDivComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SampleFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffDivComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaffDivComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffHelpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaffHelpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaffMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffSubmitSampleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaffSubmitSampleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffViewDatabasesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaffViewDatabasesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' : 'data-target="#xs-injectables-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' :
                                        'id="xs-injectables-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' }>
                                        <li class="link">
                                            <a href="injectables/FilterPipe.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FilterPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' : 'data-target="#xs-pipes-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' :
                                            'id="xs-pipes-links-module-AppModule-3641d1fd0abc6590f61b13f2561280b8"' }>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorsModule.html" data-type="entity-link">ErrorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ErrorsModule-71c809ce681eb0b1622651b30567cce8"' : 'data-target="#xs-components-links-module-ErrorsModule-71c809ce681eb0b1622651b30567cce8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorsModule-71c809ce681eb0b1622651b30567cce8"' :
                                            'id="xs-components-links-module-ErrorsModule-71c809ce681eb0b1622651b30567cce8"' }>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorsRoutingModule.html" data-type="entity-link">ErrorsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationMemberModule.html" data-type="entity-link">OrganizationMemberModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationModule.html" data-type="entity-link">OrganizationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StaffModule.html" data-type="entity-link">StaffModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AdminDashboardComponent.html" data-type="entity-link">AdminDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminMenuComponent.html" data-type="entity-link">AdminMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminNotificationComponent.html" data-type="entity-link">AdminNotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminProfileComponent.html" data-type="entity-link">AdminProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClinicAdminViewSamplesComponent.html" data-type="entity-link">ClinicAdminViewSamplesComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClinicHandlerComponent.html" data-type="entity-link">ClinicHandlerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CmwMenuComponent.html" data-type="entity-link">CmwMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorsHandler.html" data-type="entity-link">ErrorsHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/HomeComponent.html" data-type="entity-link">HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadingComponent.html" data-type="entity-link">LoadingComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginComponent.html" data-type="entity-link">LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MapsWindowComponent.html" data-type="entity-link">MapsWindowComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemberDashboardComponent.html" data-type="entity-link">MemberDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemberHandlerComponent.html" data-type="entity-link">MemberHandlerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemberMenuComponent.html" data-type="entity-link">MemberMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemberNotificationComponent.html" data-type="entity-link">MemberNotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemberProfileComponent.html" data-type="entity-link">MemberProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemberViewSamplesComponent.html" data-type="entity-link">MemberViewSamplesComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationDashboardComponent.html" data-type="entity-link">OrganizationDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationHandlerComponent.html" data-type="entity-link">OrganizationHandlerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationMemberRoutingModule.html" data-type="entity-link">OrganizationMemberRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationNotificationComponent.html" data-type="entity-link">OrganizationNotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationProfileComponent.html" data-type="entity-link">OrganizationProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationRoutingModule.html" data-type="entity-link">OrganizationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationViewSamplesComponent.html" data-type="entity-link">OrganizationViewSamplesComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreDiagnosisComponent.html" data-type="entity-link">PreDiagnosisComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportingComponent.html" data-type="entity-link">ReportingComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerErrorInterceptor.html" data-type="entity-link">ServerErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/StaffDashboardComponent.html" data-type="entity-link">StaffDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StaffHandlerComponent.html" data-type="entity-link">StaffHandlerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StaffNotificationComponent.html" data-type="entity-link">StaffNotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StaffProfileComponent.html" data-type="entity-link">StaffProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StaffRoutingModule.html" data-type="entity-link">StaffRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="classes/StaffViewSamplesComponent.html" data-type="entity-link">StaffViewSamplesComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubmitCmwDepositComponent.html" data-type="entity-link">SubmitCmwDepositComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubmitCmwRequestComponent.html" data-type="entity-link">SubmitCmwRequestComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubmitCmwRevitalizationComponent.html" data-type="entity-link">SubmitCmwRevitalizationComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserManagementAPIService.html" data-type="entity-link">UserManagementAPIService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewFormsComponent.html" data-type="entity-link">ViewFormsComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CultureCollectionAPIService.html" data-type="entity-link">CultureCollectionAPIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseManagementService.html" data-type="entity-link">DatabaseManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiagnosticClinicAPIService.html" data-type="entity-link">DiagnosticClinicAPIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocationService.html" data-type="entity-link">LocationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationLoggingService.html" data-type="entity-link">NotificationLoggingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Porting.html" data-type="entity-link">Porting</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link">AuthenticationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/accessLogInterface.html" data-type="entity-link">accessLogInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccessLogs.html" data-type="entity-link">AccessLogs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link">Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminMember.html" data-type="entity-link">AdminMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CMWDeposit.html" data-type="entity-link">CMWDeposit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CMWRequest.html" data-type="entity-link">CMWRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CMWRevitalization.html" data-type="entity-link">CMWRevitalization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Confirm.html" data-type="entity-link">Confirm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/databaseLogInterface.html" data-type="entity-link">databaseLogInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseManagementLogs.html" data-type="entity-link">DatabaseManagementLogs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabasePrivilege.html" data-type="entity-link">DatabasePrivilege</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/depositReportInterface.html" data-type="entity-link">depositReportInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiagnosticClinicLogs.html" data-type="entity-link">DiagnosticClinicLogs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/errorLogInterface.html" data-type="entity-link">errorLogInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorLogs.html" data-type="entity-link">ErrorLogs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Location.html" data-type="entity-link">Location</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginInfo.html" data-type="entity-link">LoginInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Logs.html" data-type="entity-link">Logs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Member.html" data-type="entity-link">Member</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Organisation.html" data-type="entity-link">Organisation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganisationAdmin.html" data-type="entity-link">OrganisationAdmin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganisationMember.html" data-type="entity-link">OrganisationMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/POSTLog.html" data-type="entity-link">POSTLog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/POSTMember.html" data-type="entity-link">POSTMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/POSTMember-1.html" data-type="entity-link">POSTMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/POSTOrganization.html" data-type="entity-link">POSTOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/POSTUpdate.html" data-type="entity-link">POSTUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/POSTUpdateMember.html" data-type="entity-link">POSTUpdateMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/POSTUpdateOrganization.html" data-type="entity-link">POSTUpdateOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/POSTUser.html" data-type="entity-link">POSTUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrivilegeTypes.html" data-type="entity-link">PrivilegeTypes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessedForm.html" data-type="entity-link">ProcessedForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/requestReportInterface.html" data-type="entity-link">requestReportInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/revitalizationReportInterface.html" data-type="entity-link">revitalizationReportInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Sample.html" data-type="entity-link">Sample</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SampleFormData.html" data-type="entity-link">SampleFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Species.html" data-type="entity-link">Species</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StaffInfo.html" data-type="entity-link">StaffInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StaffMember.html" data-type="entity-link">StaffMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StaffMember-1.html" data-type="entity-link">StaffMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StaffMember-2.html" data-type="entity-link">StaffMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateDepositForm.html" data-type="entity-link">UpdateDepositForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateMember.html" data-type="entity-link">UpdateMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateOrganization.html" data-type="entity-link">UpdateOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/userLogInterface.html" data-type="entity-link">userLogInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserLogs.html" data-type="entity-link">UserLogs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPrivileges.html" data-type="entity-link">UserPrivileges</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserType.html" data-type="entity-link">UserType</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});