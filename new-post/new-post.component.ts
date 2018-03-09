import { Component, OnInit } from '@angular/core';
import { PagesParentComponent } from '../pages-parent.component';
import { AllServicesService } from '../../services/all-services.service';

@Component({
	selector: 'app-new-post',
	templateUrl: './new-post.component.html',
	styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent extends PagesParentComponent implements OnInit {
	anonymous: any;
	lastIndex: any = 0;
	hashtags: any = [];
	content: any;
	preview: any;
	options: Object = {
		charCounterCount: true,
		direction: 'auto',
		toolbarButtons: ['bold', 'italic', 'paragraphFormat', 'align'],
		toolbarButtonsXS: ['bold', 'italic', 'paragraphFormat', 'align'],
		toolbarButtonsSM: ['bold', 'italic', 'paragraphFormat', 'align'],
		toolbarButtonsMD: ['bold', 'italic', 'paragraphFormat', 'align']
	};

	constructor(private allS: AllServicesService) {
		super('پست جدید');
	}
	load() {}
	ngOnInit() {
		this.allS.getMe();
	}
	submit(form) {
		if (!form.valid) return;
		// console.log(this.anonymous);
		console.log(this.content);
		this.allS.newPost(this.content, this.anonymous).subscribe(
			data => {
				let result = data.plain();
				console.log();
			},
			error => {}
		);
	}
	contentChanged() {
		this.preview = this.content;
		let regex = /#/gi,
			whiteSpace = /\s/gi,
			result,
			indices = [];
		while ((result = regex.exec(this.content))) {
			indices.push(result.index);
		}
		// indices.pop();
		indices.forEach(ind => {
			if (ind > this.lastIndex) {
				for (let i = ind; i <= this.content.length; i++) {
					/* if (i == this.content.length) {
						this.hashtags.push(this.content.substr(ind, i - 1));
						break;
					} */
					// console.log(this.content[i], /\s/.test(this.content[i]));
					if (/\s/.test(this.content[i])) {
						// console.log('here', i, this.content[i]);
						this.hashtags.push(this.content.substr(ind, i - 2).trim());
						this.lastIndex = indices[indices.length - 1];
						break;
					}
				}
			}
		});
		console.log(this.hashtags);
		let tempString = this.content;
		this.hashtags.forEach(h => {
			tempString = tempString.replace(h, '<span class="hashtag">' + h + '</span>');
		});
		this.preview = tempString;
		// this.hashtags.forEach(h => {});
	}
}
