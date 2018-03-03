import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, FacebookLoginProvider } from 'angular4-social-login';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private authStateSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStateSubscription = this.accountValidator(this.authService);
  }

  fazerLogin() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  accountValidator(authService: AuthService) {
    return authService.authState.subscribe((user) => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
    console.log('Para de escutar subscribe de usuário.')
  }

}
