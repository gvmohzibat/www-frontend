import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppInjector } from '../app-injector';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ConstantsService } from '../services/constants.service';
import { UtilityService } from '../services/utility.service';

// @Component({
//   selector: 'app-pages-parent',
//   templateUrl: './pages-parent.component.html',
//   styleUrls: ['./pages-parent.component.scss']
// })
export abstract class PagesParentComponent implements OnDestroy {
	protected subscriptions: any[] = [];
	protected endDate: string;
	protected startDate: string;
	protected appId: any;
	protected utilityService: UtilityService;
	protected constants: ConstantsService;
	constructor(pageTitle) {
		this.utilityService = AppInjector.get(UtilityService);
		this.constants = AppInjector.get(ConstantsService);
		if (pageTitle) this.utilityService.setTitle(pageTitle);

		// this.subscriptions.push();
	}

	abstract load(change?);
	ngOnDestroy() {
		this.subscriptions.forEach(sub => {
			sub.unsubscribe();
		});
	}
}
