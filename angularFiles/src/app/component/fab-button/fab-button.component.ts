import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent implements OnInit {
  @Input() flexDirection: String;
  @Input() showIcons: Boolean;
  @Input() alignBtn: String;  
  @Input() class : String;
  @Input() icon : String;
  constructor() { }

  ngOnInit() {
  }

  // floating action button direction
  setFlexDirection() {
    if (this.flexDirection === 'row' || this.flexDirection === 'row-reverse') {
      return 'containerRow';
    } else if (this.flexDirection === 'column' || this.flexDirection === 'column-reverse') {
      return 'containerColumn';
    }

  }
}
