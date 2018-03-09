import { Component, OnInit } from '@angular/core';
import { PagesParentComponent } from '../pages-parent.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PagesParentComponent implements OnInit {
  constructor() {
    super('خانه');
  }
  load() {}

  ngOnInit() {}
}
