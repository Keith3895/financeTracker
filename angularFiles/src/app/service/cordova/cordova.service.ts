import { Injectable } from '@angular/core';
import { SystemService } from '../system.service';

// declare const window: any;
declare const cordova: any;
// declare const device:any;
@Injectable()
export class CordovaService {
  systemService;
  constructor() {
    this.systemService = new SystemService();
  }
  // cordova.plugins.backgroundMode.setEnabled(true);
  runBackground() {
    cordova.plugins.backgroundMode.enable();
  }
}