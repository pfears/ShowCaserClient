import { Component, OnInit } from '@angular/core';
import { StravaService } from './StravaService/strava.service';
import { ConfigService } from './Helpers/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'ShowCaser';
  ret: any;

  private clientId; // Strava Client ID
  private redirectUri; // Your redirect URI
  private authUrl; // Strava Authorization URL
  private scopes; // The permissions your app needs


  constructor(private stravaSvc: StravaService,
              private config: ConfigService,
              private router: Router,
  ) 
  { 
    if (!this.config.settings?.strava?.apiBaseUrl) {
      throw new Error('Strava config is not loaded!');
    }
    this.clientId = this.config.settings.strava.clientId;
    this.redirectUri = this.config.settings.strava.redirectUri;
    this.authUrl = this.config.settings.strava.authUrl;
    this.scopes = this.config.settings.strava.scopes;
  }

  ngOnInit(): void {
    const hasToken = sessionStorage.getItem('strava_access_token');


    const currentUrl = this.router.url;

    if (!hasToken && !window.location.pathname.includes('/auth/callback')) {
      this.stravaSvc.initiateOAuthFlow();
    }
  }
}
