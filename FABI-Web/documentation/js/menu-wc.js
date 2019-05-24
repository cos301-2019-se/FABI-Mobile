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
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-3dc1f1343454d67b287b139979f3464d"' : 'data-target="#xs-components-links-module-AppModule-3dc1f1343454d67b287b139979f3464d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-3dc1f1343454d67b287b139979f3464d"' :
                                            'id="xs-components-links-module-AppModule-3dc1f1343454d67b287b139979f3464d"' }>
                                            <li class="link">
                                                <a href="components/AdminDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClinicHandlerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClinicHandlerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatabaseHandlerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatabaseHandlerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberHandlerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberHandlerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberSubmitSampleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberSubmitSampleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberViewSamplesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberViewSamplesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationHandlerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationHandlerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationSubmitSampleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationSubmitSampleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationViewSamplesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationViewSamplesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SampleFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SplashComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SplashComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaffDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffHandlerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaffHandlerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaffSubmitSampleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaffSubmitSampleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmitCbsDepositComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubmitCbsDepositComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmitCbsRequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubmitCbsRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmitCmwDepositComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubmitCmwDepositComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmitCmwRequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubmitCmwRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmitCmwRevitalizationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubmitCmwRevitalizationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationMemberModule.html" data-type="entity-link">OrganizationMemberModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationMemberRoutingModule.html" data-type="entity-link">OrganizationMemberRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationModule.html" data-type="entity-link">OrganizationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationRoutingModule.html" data-type="entity-link">OrganizationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StaffModule.html" data-type="entity-link">StaffModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StaffRoutingModule.html" data-type="entity-link">StaffRoutingModule</a>
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
                                <a href="classes/Porting.html" data-type="entity-link">Porting</a>
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
                                    <a href="injectables/AdminAPIService.html" data-type="entity-link">AdminAPIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiConnectionService.html" data-type="entity-link">ApiConnectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APIconnectionService.html" data-type="entity-link">APIconnectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationApiService.html" data-type="entity-link">OrganizationApiService</a>
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
                                <a href="interfaces/ClientFormData.html" data-type="entity-link">ClientFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClientFormData-1.html" data-type="entity-link">ClientFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClientFormData-2.html" data-type="entity-link">ClientFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Error.html" data-type="entity-link">Error</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Error-1.html" data-type="entity-link">Error</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormData.html" data-type="entity-link">FormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormData-1.html" data-type="entity-link">FormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginData.html" data-type="entity-link">LoginData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginData-1.html" data-type="entity-link">LoginData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginInfo.html" data-type="entity-link">LoginInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginInfo-1.html" data-type="entity-link">LoginInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginInfo-2.html" data-type="entity-link">LoginInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MemberInfo.html" data-type="entity-link">MemberInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Organization.html" data-type="entity-link">Organization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationAdmin.html" data-type="entity-link">OrganizationAdmin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationInfo.html" data-type="entity-link">OrganizationInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationInfo-1.html" data-type="entity-link">OrganizationInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignupFormData.html" data-type="entity-link">SignupFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignupFormData-1.html" data-type="entity-link">SignupFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StaffInfo.html" data-type="entity-link">StaffInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfo.html" data-type="entity-link">UserInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfo-1.html" data-type="entity-link">UserInfo</a>
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