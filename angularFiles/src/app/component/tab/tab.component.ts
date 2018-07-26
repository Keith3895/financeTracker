import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() iconName : String[];
  selected=[];
  constructor() { }

  ngOnInit() {
  }
  
  //applies css for selected tab
  tabSelect(i){
   var keys = Object.keys(this.iconName);
   keys.forEach(ind => {
     if(parseInt(ind) === i){ 
       this.selected[i] = true;
      }
      else if(parseInt(ind) != i){
       this.selected[parseInt(ind)] = false;
      }
   })
  }
}
