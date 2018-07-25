import { Component, OnInit,Input } from '@angular/core';
import { CordovaService } from '../../service/cordova/cordova.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() visible : boolean;
  iconList = ['fa fa-home','fa fa-bar-chart','fa fa-home','fa fa-home'];

  constructor(public cordovaService:CordovaService) { }

  ngOnInit() {
    this.visible = true;
    this.cordovaService.test();
  }
  closeDialog(event){
    this.visible = event;
  }    
}
