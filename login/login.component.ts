import { Component, OnInit } from '@angular/core';
import { PagesParentComponent } from '../pages-parent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends PagesParentComponent implements OnInit {
	showFP: any;
	showFPbtn: any = false;
	password: any;
	username: any;
	constructor(private router: Router, private auth: AuthService) {
		super('ورود');
	}

	ngOnInit() {
		this.load();
	}
	load() {}

	submit() {
		this.auth.login(this.username, this.password).subscribe(
			result => {},
			error => {
				console.log('object');
				this.showFPbtn = true;
			}
		);
	}

	toggleFP() {
		this.showFP = true;
	}

	forgot() {
		this.auth.forgot(this.username).subscribe(
			result => {
				this.utilityService.success('Successful', 'Check your email');
			},
			error => {}
		);
	}
}
