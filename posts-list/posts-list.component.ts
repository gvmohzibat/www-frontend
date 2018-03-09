import { Component, OnInit } from '@angular/core';
import { PagesParentComponent } from '../pages-parent.component';
import { AllServicesService } from '../../services/all-services.service';

@Component({
	selector: 'app-posts-list',
	templateUrl: './posts-list.component.html',
	styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent extends PagesParentComponent implements OnInit {
  creator: any;
	posts;
	constructor(private allS: AllServicesService) {
		super(false);
	}
	load() {
		/* this.allS.getPost(1).subscribe(data => {
      let result = data.plain();
      this.creator = JSON.parse(result.creator);
      console.log(result, this.creator);
		}); */
	}

	ngOnInit() {
		this.load();
	}
}
