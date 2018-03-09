import { Component, OnInit } from '@angular/core';
import { PagesParentComponent } from '../pages-parent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupService } from './signup.service';
@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends PagesParentComponent implements OnInit {
  signupError: any;
  username: any;
  major: any;
  majors: any;
  studentId: any;
  cpassword: any;
  password: any;
  email: any;
  test: any;
  validations = {};
  constructor(private signupService: SignupService, private router: Router) {
    super('Signup');
  }

  ngOnInit() {
    this.load();
  }
  load() {
    this.signupService.getMajors().subscribe(
      result => {
        this.majors = result.plain();
      },
      error => {
        console.error(error);
      }
    );
  }
  submit(form) {
    delete this.validations['formValid'];
    this.emailChange();
    this.passwordChange();
    this.cpasswordChange();
    this.studentidChange();
    console.log(form.valid);
    if (form.valid && Object.keys(this.validations).length === 0 && this.validations.constructor === Object) {
      delete this.validations['formValid'];
      this.signupService.signup(this.username, this.password, this.email, this.major, this.studentId).subscribe(
        data => {
          let result = data.plain();
          console.log(result);
          this.utilityService.success('You\'ve been signed up successfully', 'Registeration completed');
          this.router.navigate(['/login']);
        },
        error => {
          this.utilityService.handleServerError(error);
          this.signupError = error.data;
        }
      );
    } else {
      this.validations['formValid'] = 'The form is invalid';
    }
  }
  emailChange() {
    if (this.email && this.email.endsWith('@ut.ac.ir')) delete this.validations['email'];
    else this.validations['email'] = 'Email should start with @ut.ac.ir';
  }
  passwordChange() {
    // let passRe = /[a-zA-Z1-9!@#$%^&*(){}[]]/gi;
    let alph = /[a-zA-Z]/g;
    let num = /[1-9]/g;
    let sp = /[$&+,:;=?@#|'<>.^*()%!-]/g;
    // console.log(this.password.search(alph) ,  this.password.search(num), this.password.search(sp));
    if (
      this.password &&
      this.password.length >= 8 &&
      this.password.search(alph) !== -1 &&
      this.password.search(num) !== -1 &&
      this.password.search(sp) !== -1
    )
      delete this.validations['password'];
    else
      this.validations['password'] =
        'Password should be at least 8 characters and contain at least one alphabet, one numeral and one special character';
  }
  cpasswordChange() {
    if (this.cpassword && this.password && this.cpassword === this.password) delete this.validations['cpassword'];
    else this.validations['cpassword'] = "Confirmation password doesn't equal to password";
  }
  studentidChange() {
    if (this.studentId && this.studentId.length === 9) delete this.validations['studentid'];
    else this.validations['studentid'] = 'Student ID must have 9 numbers length';
  }
}
