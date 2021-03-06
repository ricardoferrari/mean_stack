import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    userIsAuthenticated: boolean = false;
    private authListenerSubscription: Subscription;

    constructor (private authService: AuthService) {}

    onLogout() {
        this.authService.logout();
    }

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuthenticated();
        this.authListenerSubscription = this.authService.getAuthStatusObservable()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
            });
    }

    ngOnDestroy() {
        this.authListenerSubscription.unsubscribe();
    }
}