import { Injectable } from '@angular/core';
import { SystemService } from '../system.service';
import { SmsService } from '../smsfunctions/sms.service';
import { HttpClient } from '@angular/common/http';

// declare const window: any;
declare const cordova: any;
declare const SMS: any;
// declare const device:any;
@Injectable()
export class CordovaService {
  systemService;
  smsList = [];
  constructor(public smsService: SmsService,
    public http:HttpClient) {
    this.systemService = new SystemService();
    document.addEventListener('onSMSArrive', (e) => {
      
      var sms = e['data'];
      this.smsList.push(sms);
      let transactions = [];
      let transactionObject = this.smsService.Transaction(sms);
      if (typeof transactionObject == 'object') {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
        cordova.plugins.locationServices.geolocation.getCurrentPosition((position) => {
          transactions.push(Object.assign(transactionObject, { geoLocation: position.coords }));
          // http
        }, this.onError,{ enableHighAccuracy: true });
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
    cordova.plugins.backgroundMode.on('activate', function() {
      cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
   });
   cordova.plugins.backgroundMode.on('enable', function() {
    cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
 });
  }
  readMessages() {
    const filter = {
      box: 'inbox',
    };
    SMS.listSMS(filter,async (data) => {
      let templist=[];
      this.smsList = data;
      await this.smsList.forEach(el => {
        let condi = this.smsService.Transaction(el)
        if(condi)
        templist.push(condi);
      });
      
    }, (err) => {
      console.log('error list sms: ' + err);
    });
  }
  requestPermision(callback) {
    const permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.RECEIVE_SMS
      , (status) => {
        permissions.requestPermission(permissions.ACCESS_FINE_LOCATION
          , (status) => {
            permissions.requestPermission(permissions.READ_SMS, (status) => {
              callback(status);
            }, null);
          }, null);
      }, null);
  }
  test() {
    this.requestPermision((st) => {
      SMS.startWatch((status) => {
      }, null);
      cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
      // cordova.plugins.locationServices.geolocation.getCurrentPosition(this.onSuccess,this.onError,{ enableHighAccuracy: true });
    });
  }
}