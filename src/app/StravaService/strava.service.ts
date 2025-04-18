import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../Helpers/config.service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StravaService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private authUrl: string;
  private tokenUrl: string;
  private apiBaseUrl: string;
  private scopes: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {
    // Load Strava config from config service
    const strava = this.config.settings?.strava;
    if (!strava) throw new Error('Strava config not loaded');

    this.clientId = strava.clientId;
    this.clientSecret = strava.clientSecret;
    this.redirectUri = strava.redirectUri;
    this.authUrl = strava.authUrl;
    this.tokenUrl = strava.tokenUrl;
    this.apiBaseUrl = strava.apiBaseUrl;
    this.scopes = strava.scopes;
  }

  
  /**
   * Fetch authenticated user (athlete) profile
   */
  getAthlete(): Observable<any> {
    return this.getValidAccessToken().pipe(
      switchMap((token) => {
        if (!token) return of(null);
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get(`${this.apiBaseUrl}/athlete`, { headers });
      })
    );
  }

  /**
   * Fetch athlete's activities (requires auth)
   */
  getActivities(): Observable<any> {
    return this.getValidAccessToken().pipe(
      switchMap((token) => {
        if (!token) return of(null);
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get(`${this.apiBaseUrl}/athlete/activities`, { headers });
      })
    );
  }

  /**
   * Exchange authorization code for access + refresh tokens
   * Called once, when redirected back from Strava after login
   */
  exchangeCodeForToken(code: string): Observable<any> {
    const tokenRequestBody = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('code', code)
      .set('grant_type', 'authorization_code')
      .set('redirect_uri', this.redirectUri);
  
    return this.http.post<any>(this.tokenUrl, tokenRequestBody).pipe(
      catchError(error => {
        console.error('Token exchange failed:', error);
        throw error;  // Rethrow the error for further handling
      })
    );
  }

  /**
   * Refresh access token using the stored refresh token
   * Automatically called when access token expires
   */
  private refreshAccessToken(refreshToken: string): Observable<any> {
    const body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    return this.http.post(this.tokenUrl, body);
  }

  /**
   * Get a valid access token
   * Checks expiration, refreshes if needed, then returns it
   */
  private getValidAccessToken(): Observable<string | null> {
    const expiresAt = parseInt(sessionStorage.getItem('strava_expires_at') || '0', 10);
    const now = Math.floor(Date.now() / 1000);

    // Token is still valid
    if (now < expiresAt) {
      return of(sessionStorage.getItem('strava_access_token'));
    } else {
      // Token expired — refresh
      const refreshToken = sessionStorage.getItem('strava_refresh_token');
      if (!refreshToken) {
        this.handleAuthError();
        return of(null);
      }

      return this.refreshAccessToken(refreshToken).pipe(
        switchMap((res: any) => {
          this.storeAuthData(res); // Save new tokens
          return of(res.access_token);
        })
      );
    }
  }

  /**
   * Save auth data to sessionStorage
   * Called after login or token refresh
   */
  storeAuthData(res: any): void {
    sessionStorage.setItem('strava_access_token', res.access_token);
    sessionStorage.setItem('strava_refresh_token', res.refresh_token);
    sessionStorage.setItem('strava_expires_at', res.expires_at.toString());
  }

  /**
   * Handle failed auth or missing token
   * Clears session and routes to login
   */
  private handleAuthError(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  /**
   * Redirects the user to Strava’s OAuth authorization page.
   * Should be called if no valid access token is found.
   */
  initiateOAuthFlow(): void {
    const token = sessionStorage.getItem('strava_access_token');

    // Only redirect if no token is stored
    if (!token) {
      const state = this.generateState(); // CSRF protection

      const authUrl = `${this.authUrl}?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${this.scopes}&state=${state}`;

      // 🌍 Redirect the user to Strava's OAuth page
      window.location.href = authUrl;
    }
  }

  /**
   * Helper method to generate a random state string
   * Used to protect against CSRF attacks
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}