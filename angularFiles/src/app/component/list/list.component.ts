import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list = [{
    "icon": "Spent.svg",
    "Text": "Spent",
    "Amount": 3000,
    "Date": new Date(),
    "action" : "fas fa-arrow-circle-right"
  },
  {
    "icon": "Receive.svg",
    "Text": "Recieved",
    "Amount": 3000,
    "Date": new Date(),
    "action" : "fas fa-arrow-circle-right"
  },{
    "icon": "Receive.svg",
    "Text": "Recieved",
    "Amount": 3000,
    "Date": new Date(),
    "action" : "fas fa-arrow-circle-right"
  },{
    "icon": "Spent.svg",
    "Text": "Spent",
    "Amount": 3000,
    "Date": new Date(),
    "action" : "fas fa-arrow-circle-right"
  },{
    "icon": "Receive.svg",
    "Text": "Recieved",
    "Amount": 3000,
    "Date": new Date(),
    "action" : "fas fa-arrow-circle-right"
  },{
    "icon": "Receive.svg",
    "Text": "received",
    "Amount": 3000,
    "Date": new Date(),
    "action" : "fas fa-arrow-circle-right"
  }]
  constructor() { }

  ngOnInit() {
  }

  addFuntionality(){
    
  }
}
