import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  key: any;
	constructor(private route: ActivatedRoute) {
    this.key = this.route.snapshot.queryParams['returnUrl'];
  }

	ngOnInit() {}
}
