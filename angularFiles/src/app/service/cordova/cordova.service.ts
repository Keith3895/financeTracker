import { Injectable } from '@angular/core';
import { SystemService } from '../system.service';

// declare const window: any;
declare const cordova: any;
declare const SMS: any;
// declare const device:any;
@Injectable()
export class CordovaService {
  systemService;
  smsList = [];
  constructor() {
    this.systemService = new SystemService();
    document.addEventListener('onSMSArrive', (e) => {
      var sms = e['data'];

      this.smsList.push(sms);
    });
  }
  // cordova.plugins.backgroundMode.setEnabled(true);
  runBackground() {
    cordova.plugins.backgroundMode.enable();
  }
  readMessages() {
    // SMS.count({}, (st) => {
      // console.log('st');
      // console.log(st);
      const filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

        // following 4 filters should NOT be used together, they are OR relationship
        // read : 0, // 0 for unread SMS, 1 for SMS already read
        // _id : 1234, // specify the msg id
        // address : '+8613601234567', // sender's phone number
        // body : 'This is a test SMS', // content to match

        // following 2 filters can be used to list page up/down
        indexFrom: 0, // start from index 0
        maxCount: 40, // count of SMS to return each time
      };
      SMS.listSMS(filter, (data) => {
        console.log(data);
      }, (err) => {
        console.log('error list sms: ' + err);
      });
    // }, null);
  }
  requestPermision(callback) {
    // READ_SMS
    // RECEIVE_SMS
    const permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.RECEIVE_SMS
      , (status) => {
        console.log('inside first permission call' + status);
      }, null);
    permissions.requestPermission(permissions.READ_SMS, (status) => {
      SMS.startWatch(null, null);
      callback(status);
    }, null);
  }

}