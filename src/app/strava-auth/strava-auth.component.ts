import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StravaService } from '../StravaService/strava.service';

@Component({
  selector: 'app-strava-auth',
  standalone: false,
  templateUrl: './strava-auth.component.html',
  styleUrl: './strava-auth.component.css'
})
export class StravaAuthComponent implements OnInit {

  constructor(private route: ActivatedRoute, private stravaService: StravaService, private router: Router) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');

    console.log('Auth Code:', code);
    console.log('Returned state:', state);

    if (code) {
      this.stravaService.exchangeCodeForToken(code).subscribe({
        next: (res: any) => {
          this.stravaService.storeAuthData(res);
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('Token exchange failed:', err);
          this.router.navigate(['/login']);
        }
      });
    } else {
      console.warn('No code in query params');
      this.router.navigate(['/login']);
    }
  }
}