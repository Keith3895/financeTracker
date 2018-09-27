import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() modalView: boolean;
  flexDirection = 'column';       // to display floating float icon direction
  iconList = ['fa fa-home', 'fa fa-tachometer', 'fa fa-credit-card', 'fa fa-cog']; // display list of icons in footer
  alignFabBtn = 'bottomRight';
  addAcc;
  addTran;
  smsConfirmVisible = true;
  showIcons: Boolean;
  constructor() { }

  ngOnInit() {
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
  scanMsgs(){
    this.smsConfirmVisible=true;
  }
  closeScan(){
    this.smsConfirmVisible=false;
  }
}
