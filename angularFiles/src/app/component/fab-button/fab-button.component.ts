import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent implements OnInit {
  @Input() flexDirection: String;
  /** @flexDirection
   * - possible Values : row, row-reverse, column, column-reverse
   * - default Value : row
   */
  @Input() showIcons: Boolean;
  /** @showIcons
   * - toggle the sub buttons
   */
  @Input() alignBtn: String;
  /** @alignBtn
   * - possiblilty : bottomRight,bottomLeft,topRight,topLeft
   * - default : bottomRight
   */
  @Input() color: String;
  /** @color
   * - sets background color for fixed fab button
   * - possibility : red,blue,green
   */
  @Input() icon: String;
  /** @icon
   * - font awesome icon name for fixed fab button
   */
  constructor() { }

  ngOnInit() {
  }

  /**
   * set direction of FAB sub-button(list of buttons).
   */
  setFlexDirection() {
    if (this.flexDirection === 'row' || this.flexDirection === 'row-reverse') {
      return 'containerRow';
    } else if (this.flexDirection === 'column' || this.flexDirection === 'column-reverse') {
      return 'containerColumn';
    }else{
      this.flexDirection = 'row';
    }
  }
}
