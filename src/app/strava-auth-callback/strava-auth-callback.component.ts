import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StravaService } from '../StravaService/strava.service';

@Component({
  selector: 'app-strava-auth-callback',
  standalone: false,
  template: `<p>Authorizing with Strava...</p>`
})
export class StravaAuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stravaService: StravaService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      this.stravaService.exchangeCodeForToken(code).subscribe({
        next: (res: any) => {
          this.stravaService.storeAuthData(res);
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('Token exchange failed:', err);
          //this.router.navigate(['/login']);
        }
      });
    } else {
      console.warn('No code found in query params');
      this.router.navigate(['/login']);
    }
  }
}
