import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.formInit();
    }

    formInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['']
        });
    }

    passwordChanged(event){
        this.loginForm.get('password').setValue(event);
    }
     
    
}
