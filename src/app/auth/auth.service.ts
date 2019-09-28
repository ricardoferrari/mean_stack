import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: "root" })
export class AuthService {

    private token: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    getToken() {
        return this.token;
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

    login(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        this.http.post<{token: string}>("http://localhost:3000/users/login", authData)
            .subscribe(response => {
                console.log(response);
                const token = response.token;
                this.token = token;
                this.authStatusListener.next(true);
            })
    }
}