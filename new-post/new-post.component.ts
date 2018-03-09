import { Component, OnInit } from '@angular/core';
import { PagesParentComponent } from '../pages-parent.component';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent extends PagesParentComponent implements OnInit {
  constructor() {
    super('پست جدید');
  }
  load() {}
  ngOnInit() {}
  submit(form) {
    if (!form.valid) return;
  }
}
