import { IUser } from './../models/app.models';
import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:IUser;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.user = this._authService.getLoggedInUser();
  }

}
