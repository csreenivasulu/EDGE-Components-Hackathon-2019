import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  showInfo: boolean = false;
  passLength: number = 0;
  specialFlag: number = 0;
  capiltalFlag: number = 0;
  numberFlag: number = 0;
  numberGenerator: number = 0;
  total = 0;
  bgColor: string = "#CCC";
  passwordForm: FormGroup;

  @Input() passwordMatch: boolean = false;
  @Input() labelOneValue: string = 'Password';
  @Input() labelTwoValue: string = 'Confirm Password';
  @Input() showLabel: boolean = false;

  @Output() passwordChange = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.formInit();
  }

  formInit() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])],
      confirmPassword: ['']
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }

  ngOnInit() {
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  checkPasswordStrength(passWord) {
    // emit password value to parent component
    this.passwordChange.emit(passWord);

    this.passLength = passWord.length;

    this.specialFlag = passWord.match(/^[a-zA-Z0-9- ]*$/) ? 0 : 15;
    this.numberFlag = passWord.match(/[0-9]/) ? 15 : 0;
    this.capiltalFlag = passWord.match(/[A-Z]/) ? 15 : 0;

    if (this.passLength > 4 && this.passLength <= 5) {
      this.numberGenerator = 25;
    } else if (this.passLength >= 6 && this.passLength <= 7) {
      this.numberGenerator = 35;
    } else if (this.passLength >= 8) {
      this.numberGenerator = 55;
    } else if (this.passLength > 0 && this.passLength <= 4) {
      this.numberGenerator = 15;
    } else {
      this.numberGenerator = 0;
    }

    this.total = this.numberGenerator + this.specialFlag + this.capiltalFlag + this.numberFlag;

    if (this.total < 30) {
      this.bgColor = "#CCC";
    } else if (this.total < 60 && this.total >= 30) {
      this.bgColor = "#FF6600";
    } else if (this.total >= 60 && this.total < 90) {
      this.bgColor = "#FFCC00";
    } else if (this.total >= 90) {
      this.bgColor = "#0f0";
    }
  }

}


export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPassword').value;
    if (password != confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
      return null;
    }
  }
}