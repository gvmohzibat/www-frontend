import { Component, OnInit } from '@angular/core';
import { PagesParentComponent } from '../pages-parent.component';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends PagesParentComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {
    super('ورود');
  }

  ngOnInit() {
    this.load();
  }
  load() {}
}
