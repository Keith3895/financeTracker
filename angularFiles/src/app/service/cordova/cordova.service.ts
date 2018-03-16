import { Injectable } from '@angular/core';
import { SystemService } from '../system.service';
import { SmsService } from '../smsfunctions/sms.service';

// declare const window: any;
declare const cordova: any;
declare const SMS: any;
// declare const device:any;
@Injectable()
export class CordovaService {
  systemService;
  smsList = [];
  constructor(public smsService: SmsService) {
    this.systemService = new SystemService();
    document.addEventListener('onSMSArrive', (e) => {
      
      var sms = e['data'];
      this.smsList.push(sms);
      console.log(sms);
      let transactions = [];
      let transactionObject = this.smsService.Transaction(sms);
      console.log(typeof transactionObject);
      if (typeof transactionObject == 'object') {
        console.log('test');
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords);
          // transactions.push(Object.assign(transactionObject, { geoLocation: position.coords }));
          // console.log(transactions);
        }, this.onError);
      }
    });
  }
  onSuccess(position) {
    alert('Latitude: ' + position.coords.latitude + '\n' +
      'Longitude: ' + position.coords.longitude + '\n' +
      'Altitude: ' + position.coords.altitude + '\n' +
      'Accuracy: ' + position.coords.accuracy + '\n' +
      'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
      'Heading: ' + position.coords.heading + '\n' +
      'Speed: ' + position.coords.speed + '\n' +
      'Timestamp: ' + position.timestamp + '\n');
  }
  onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }
  runBackground() {
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
  }
  readMessages() {
    const filter = {
      box: 'inbox',
    };
    SMS.listSMS(filter, (data) => {
      console.log(data);
      this.smsList = data;
      this.smsList.forEach(el => {
        console.log(this.smsService.Transaction(el));
      });
    }, (err) => {
      console.log('error list sms: ' + err);
    });
  }
  requestPermision(callback) {
    const permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.RECEIVE_SMS
      , (status) => {
        console.log(status);
        permissions.requestPermission(permissions.ACCESS_FINE_LOCATION
          , (status) => {
            console.log('loca');
            console.log(status);
            permissions.requestPermission(permissions.READ_SMS, (status) => {
              callback(status);
            }, null);
          }, null);
      }, null);
  }
  test() {
    this.requestPermision((st) => {
      SMS.startWatch((status) => {
        console.log(status);
      }, null);
      navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    });
  }
}