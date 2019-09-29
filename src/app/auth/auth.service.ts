import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Injectable({ providedIn: "root" })
export class AuthService {
    private tokenTimer: any;
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated: boolean = false;

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    getAuthStatusObservable() {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        this.http.post("http://localhost:3000/users/signup", authData)
            .subscribe(response => {
                console.log(response);
            })
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();
        if (!authInfo) return;
        const now = new Date();
        const expiration = authInfo.expiresIn.getTime() - now.getTime();
        // console.log(expiration);
        if (expiration > 0) {
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiration / 1000);
            this.authStatusListener.next(true);
        }
    }

    login(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/users/login", authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresIn = response.expiresIn;
                    this.setAuthTimer(expiresIn);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
                    this.saveAuthData(token, expirationDate);
                    this.router.navigate(['/']);
                }
            })
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expires = localStorage.getItem('expiration');
        if (!token || !expires) return;
        return {
            token: token,
            expiresIn: new Date(expires)
        }
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }
}