import { Component, OnInit } from '@angular/core';
import {DatepickerOptions} from '../../component/ng-datepicker/component/ng-datepicker.component';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
@Component({
  selector: 'app-add-tform',
  templateUrl: './add-tform.component.html',
  styleUrls: ['./add-tform.component.scss']
})
export class AddTformComponent implements OnInit {
  bankAccount = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
    'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
    'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
    'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
    'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis',
    'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros'];
  date: Date=new Date();
  options: DatepickerOptions = {
    locale: enLocale
  };
  constructor() { }

  ngOnInit() {
  }

}
