import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesParentComponent } from '../pages-parent.component';
import { SignupService } from '../signup/signup.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends PagesParentComponent implements OnInit {
	username: any;
	cpassword: any;
	validations: any = {};
	password: any;
	key: any;
	constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {
		super('Forgot');
		this.key = this.route.snapshot.queryParams['username'];
	}

	load() {}

	ngOnInit() {}
	submit(form) {
		delete this.validations['formValid'];
		this.passwordChange();
		this.cpasswordChange();
		console.log(form.valid);
		if (form.valid && Object.keys(this.validations).length === 0 && this.validations.constructor === Object) {
			delete this.validations['formValid'];
			this.auth.forgetP(this.key, this.password).subscribe(
				data => {
					let result = data.plain();
					console.log(result);
					this.utilityService.success("Password changed successfully", 'Registeration completed');
					this.router.navigate(['/login']);
				},
				error => {
					this.utilityService.handleServerError(error);
				}
			);
		} else {
			this.validations['formValid'] = 'The form is invalid';
		}
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
}
