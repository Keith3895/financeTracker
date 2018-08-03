import { Component, OnInit, Input } from '@angular/core';
import { CordovaService } from '../../service/cordova/cordova.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() modalView: boolean;
  showIcons: Boolean;
  flexDirection = 'column';       // to display floating float icon direction
  iconList = ['fa fa-home', 'fa fa-tachometer', 'fa fa-credit-card', 'fa fa-cog']; // display list of icons in footer
  alignFabBtn = 'bottomRight';
  addAcc;
  addTran;
  constructor(public cordovaService: CordovaService) { }

  ngOnInit() {
    this.cordovaService.test();
    this.addTransaction();
  }

  closeDialog(event) {
    this.modalView = event;
    this.addAcc = this.addTran = false;
  }

  addAccount() {
    this.showIcons = false;
    this.modalView = true;
    this.addAcc = true;
  }
  addTransaction() {
    this.showIcons = false;
    this.addTran = true;
    this.modalView = true;
  }
}


