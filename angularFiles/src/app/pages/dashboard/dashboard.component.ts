import { Component, OnInit } from '@angular/core';
import { CordovaService } from '../../service/cordova/cordova.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public cordovaService:CordovaService) { }

  ngOnInit() {
    console.log('in dash');
    this.cordovaService.test();
  }
  
}
