import { Component, OnInit, Input } from '@angular/core';
import { CordovaService } from '../../service/cordova/cordova.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  
  constructor(public cordovaService: CordovaService) { }
  smsConfirmVisible = true;
  smsConfirm = true;
  ngOnInit() {
    // this.cordovaService.test();
    // this.addAccount();
    // this.smsConfirmVisible=false;
  }

}


