import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    onSignup(form: NgForm) {
        if (form.invalid) return;
        console.log(form.value);
    }

}