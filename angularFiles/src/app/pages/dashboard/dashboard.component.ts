import { Component, OnInit, Input } from '@angular/core';
import { CordovaService } from '../../service/cordova/cordova.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() visibleChange: boolean;
  showIcons: Boolean;
  flexDirection = 'column';       // to display floating float icon direction
  iconList = ['fa fa-home', 'fa fa-tachometer', 'fa fa-credit-card', 'fa fa-cog']; //display list of icons in footer

  constructor(public cordovaService: CordovaService) { }

  ngOnInit() {
    this.cordovaService.test();
  }

  closeDialog(event) {
    this.visibleChange = event;
  }

  addAccount() {
    this.showIcons = false;
    this.visibleChange = true;
  }
}


