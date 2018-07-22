import { Component, OnInit } from '@angular/core';
import { CordovaService } from '../../service/cordova/cordova.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  iconList = ['fa fa-home','fa fa-bar-chart','fa fa-home','fa fa-home'];

  constructor(public cordovaService:CordovaService) { }

  ngOnInit() {
    this.cordovaService.test();
  }
  
}
