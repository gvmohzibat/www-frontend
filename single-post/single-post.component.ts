import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../../services/all-services.service';
import { PagesParentComponent } from '../pages-parent.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-single-post',
	templateUrl: './single-post.component.html',
	styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent extends PagesParentComponent implements OnInit {
	isPostAuthor: boolean;
	myValue: any;
	likes: any;
	dislikes: any;
	isAnonymous: any;
	authorLink: any;
	id: any;
	sub: any;
	text: any;
	creator: any;
	posts;
	constructor(private allS: AllServicesService, private route: ActivatedRoute, private auth: AuthService) {
		super('Post');
	}
	load() {
		this.allS.getPost(this.id).subscribe(data => {
			let result = data.plain();
			this.creator = JSON.parse(result.creator);
			console.log(result, this.creator);
			this.text = result.text;
			this.authorLink = 'students/' + this.creator.pk;

			this.isAnonymous = (result.anonymous && this.auth.username == this.creator.username) ? false : true;

			this.likes = result.likes;
			this.dislikes = result.dislikes;
			this.myValue = result.my_value;
			this.isPostAuthor = this.auth.username == this.creator.username;
		});
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.id = parseInt(params['id']);
			this.load();
		});
	}

	reportPost() {
		this.allS.reportPost(this.id).subscribe(data => {
			let result = data.plain();
		});
	}
	dislikePost() {
		if (this.myValue === -1) return;
		this.allS.vote(this.id, -1).subscribe(
			data => {
				let result = data.plain();
				this.dislikes++;
				if (this.myValue === 1) {
					this.likes--;
				}
				this.myValue = -1;
			},
			error => {
				this.utilityService.handleServerError(error);
			}
		);
	}
	likePost() {
		if (this.myValue === 1) return;
		this.allS.vote(this.id, 1).subscribe(
			data => {
				let result = data.plain();
				this.likes++;
				if (this.myValue === -1) {
					this.dislikes--;
				}
				this.myValue = 1;
			},
			error => {
				this.utilityService.handleServerError(error);
			}
		);
	}
	deletePost() {
		console.log('object');
		this.allS.deletePost(this.id);
	}
}
