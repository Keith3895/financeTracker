import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  triggerOpen(ve) {
    this.open.emit(null);
    console.log(ve.distance);
  }
  triggerClose(ve) {
    this.close.emit(null);
    console.log(ve.distance);
  }
}
