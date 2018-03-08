import { Injectable } from '@angular/core';

// declare const window: any;
declare const cordova:any;
// declare const device:any;
@Injectable()
export class CordovaService {

  constructor() {
   }
  // cordova.plugins.backgroundMode.setEnabled(true);
   runBackground(){
    console.log('here');
    cordova.plugins.backgroundMode.enable();
    console.log(cordova.plugins.backgroundMode.isActive());
    
   }
}
