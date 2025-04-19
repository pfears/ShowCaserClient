import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StravaService } from '../StravaService/strava.service';

@Component({
  selector: 'app-strava-auth-callback',
  standalone: false,
  templateUrl: './strava-auth-callback.component.html'
})
export class StravaAuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stravaService: StravaService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('authCompleted')) {
      // Avoid running the token exchange logic again if already completed
      return;
    }
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      this.stravaService.exchangeCodeForToken(code).subscribe({
        next: (res: any) => {
          this.stravaService.storeAuthData(res);
          sessionStorage.setItem('authCompleted', 'true');
          // Prevent unnecessary navigation if already on dashboard
          if (this.router.url !== '/dashboard') {
            console.log("Navigating To Dash");
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err: any) => {
          console.error('Token exchange failed:', err);
        }
      });
    } else {
      console.warn('No code found in query params');
      //this.router.navigate(['/login']);
    }
  }
}
