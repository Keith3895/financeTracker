import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CordovaService } from './service/cordova/cordova.service';
declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit {
  @Input() modalView: boolean;
  menuState: string = 'in';
  showIcons: Boolean;
  flexDirection = 'column';       // to display floating float icon direction
  iconList = ['fa fa-home', 'fa fa-tachometer', 'fa fa-credit-card', 'fa fa-cog']; // display list of icons in footer
  alignFabBtn = 'bottomRight';
  addAcc;
  addTran;
  smsConfirmVisible = true;
  constructor(private router: ActivatedRoute,
    public cordovaService: CordovaService) {
  }
  ngOnInit() {
    document.addEventListener("deviceready", () => {
      this.cordovaService.requestPermision((status) => {
        this.cordovaService.runBackground();
      });
    }, false);
  }
  onOpen(event) {
    this.menuState = 'out';
  }
  onClose(event) {
    this.menuState = 'in';
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
