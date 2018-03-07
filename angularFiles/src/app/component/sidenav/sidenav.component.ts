import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LoginService} from '../../service/login.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }
  triggerOpen(ve) {
    this.open.emit(null);
  }
  triggerClose(ve) {
    this.close.emit(null);
  }
}
