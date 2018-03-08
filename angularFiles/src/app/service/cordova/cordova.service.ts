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
    cordova.plugins.backgroundMode.enable();
   }
   openApp(){
    
   }
}
