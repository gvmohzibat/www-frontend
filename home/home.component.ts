import { Component, OnInit } from '@angular/core';
import { PagesParentComponent } from '../pages-parent.component';
import { AllServicesService } from '../../services/all-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PagesParentComponent implements OnInit {
  isLoggedIn: boolean;
  username: any;
	constructor(private allS: AllServicesService, private router: Router, private auth: AuthService) {
		super('home');
	}
	load() {
		this.allS.getMe().subscribe(
			data => {
				let result = data.plain();
				this.username = result.username;
				if (result.is_admin) {
					// this.router.navigate(['/admin']);
				}
				console.log(result);
			},
			error => {
				this.utilityService.handleServerError(error);
			}
    );
    if (this.auth.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false
    }
	}

	ngOnInit() {
		this.load();
  }
  logout() {
    this.auth.logout();
  }
}
