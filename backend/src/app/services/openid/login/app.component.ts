import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

import { AuthService } from '../../auth/auth.service'
import { ConfigService } from '../../auth/config.service'

@Component({
  selector: 'cui-system-login',
  template: `
    <div class="container-fluid">
      <div class="container-fluid mt-2">
        <h1>Welcome</h1>
        <p>This is part of the app.component. Below is the router outlet.</p>
        <hr />
        <router-outlet></router-outlet>
        <div class="authenticating-loader" *ngIf="!(isDoneLoading | async)">
          <div>Authenticating...</div>
        </div>
        <hr />
        <p>
          You can <a routerLink="/url-without-route">go to a url without a route</a> to see the
          fallback route.
        </p>
        <hr />
        <p>
          <button class="btn btn-success mr-1" (click)="login()">login</button>
          <button class="btn btn-primary mr-1" (click)="logout()">logout</button>
          <button
            [disabled]="!(isAuthenticated | async)"
            class="btn btn-primary mr-1"
            (click)="pizzaShack()"
          >
            pizzashack forever
          </button>
          <button class="btn btn-link mr-1" (click)="logoutExternally()">
            logout externally...
          </button>
        </p>
        <p>
          <button class="btn btn-warning mr-1" (click)="refresh()">force silent refresh</button>
          <button class="btn btn-secondary mr-1" (click)="reload()">reload page</button>
          <button class="btn btn-danger mr-1" (click)="clearStorage()">clear storage</button>
        </p>
        <hr />
        <table class="table table-bordered table-sm table-props">
          <tr>
            <th>Identity URL</th>
            <td>
              <code>{{ authIdentity }}</code>
            </td>
          </tr>
          <tr>
            <th>API URL</th>
            <td>
              <code>{{ authAPI }}</code>
            </td>
          </tr>
          <tr>
            <th>Client ID</th>
            <td>
              <code>{{ clientId }}</code>
            </td>
          </tr>
          <tr>
            <th>Issuer URL</th>
            <td>
              <code>{{ issuer }}</code>
            </td>
          </tr>
          <tr>
            <th>IsAuthenticated</th>
            <td>
              <code>{{ isAuthenticated | async }}</code>
            </td>
          </tr>
          <tr>
            <th>HasValidToken</th>
            <td>
              <code>{{ hasValidToken }}</code>
            </td>
          </tr>
          <tr>
            <th>IsDoneLoading</th>
            <td>
              <code>{{ isDoneLoading | async }}</code>
            </td>
          </tr>
          <tr>
            <th>CanActivateProtectedRoutes</th>
            <td>
              <code>{{ canActivateProtectedRoutes | async }}</code>
            </td>
          </tr>
          <tr>
            <th>IdentityClaims</th>
            <td class="pre">
              <code>{{ identityClaims | json }}</code>
            </td>
          </tr>
          <tr>
            <th>RefreshToken</th>
            <td>
              <code class="break-all">{{ refreshToken }}</code>
            </td>
          </tr>
          <tr>
            <th>AccessToken</th>
            <td>
              <code class="break-all">{{ accessToken }}</code>
            </td>
          </tr>
          <tr>
            <th>IdToken</th>
            <td>
              <code class="break-all">{{ idToken }}</code>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
})
export class AppComponent {
  isAuthenticated: Observable<boolean>
  isDoneLoading: Observable<boolean>
  canActivateProtectedRoutes: Observable<boolean>

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private router: Router,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated$
    this.isDoneLoading = this.authService.isDoneLoading$
    this.canActivateProtectedRoutes = this.authService.canActivateProtectedRoutes$

    this.authService.runInitialLoginSequence()
  }

  pizzaShack() {
    this.router.navigate(['/basics/home'])
  }
  login() {
    this.authService.login()
  }
  logout() {
    this.authService.logout()
  }
  refresh() {
    this.authService.refresh()
  }
  reload() {
    window.location.reload()
  }
  clearStorage() {
    localStorage.clear()
  }

  logoutExternally() {
    window.open(this.authService.logoutUrl)
  }

  get authIdentity() {
    return this.configService.authUrl
  }
  get authAPI() {
    return this.configService.apiUrl
  }
  get clientId() {
    return this.configService.authConfig.clientId
  }
  get issuer() {
    return `${this.configService.authConfig.issuer}/.well-known/openid-configuration`
  }
  get hasValidToken() {
    return this.authService.hasValidToken()
  }
  get accessToken() {
    return this.authService.accessToken
  }
  get refreshToken() {
    return this.authService.refreshToken
  }
  get identityClaims() {
    return this.authService.identityClaims
  }
  get idToken() {
    return this.authService.idToken
  }
}
