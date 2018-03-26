import { AlertService } from './../alert.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnDestroy {
  subscription: Subscription;
  message: any;
  constructor( private alertService : AlertService) {
    this.subscription = alertService.getMessage().subscribe(
      message => this.message = message
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
