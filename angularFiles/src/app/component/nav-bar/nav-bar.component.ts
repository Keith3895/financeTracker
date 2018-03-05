import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  PageHeader="";
  @Output() open: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.PageHeader = this.router.url.replace(/\b\w/g, l => l.toUpperCase()).replace(/\//g, '');
    });
  }
  openSide(){
    console.log('here');
    this.open.emit(null);
  }

}
