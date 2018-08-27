import { Component, OnInit } from '@angular/core';
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
  menuState: string = 'in';
  
  constructor(private router: ActivatedRoute,
  public cordovaService: CordovaService) {
  }
  ngOnInit() {
    document.addEventListener("deviceready", ()=>{
      this.cordovaService.requestPermision((status)=>{
        this.cordovaService.runBackground();
      });
    } , false);
  }
  onOpen(event){
    this.menuState='out';
  }
  onClose(event){
    this.menuState='in';
  }
  // scanMsgs(){
  //   this.cordovaService.readMessages();
  // }
}
