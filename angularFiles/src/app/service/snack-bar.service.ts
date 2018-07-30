import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
@Injectable()
export class SnackBarService {
    private subject = new Subject<Alert>();
    constructor() {
    }
 
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
 
    success(message: string) {
        this.alert(AlertType.Success, message);
    }
 
    error(message: string) {
        this.alert(AlertType.Error, message);
    }
 
    info(message: string) {
        this.alert(AlertType.Info, message);
    }
 
    warn(message: string) {
        this.alert(AlertType.Warning, message);
    }
 
    alert(type: AlertType, message: string) {
        this.subject.next(<Alert>{ type: type, message: message });
    }
 
    clear() {
        // clear alerts
        this.subject.next();
    }
}


export class Alert{
  type : AlertType;
  message : String;
}

export enum AlertType {
  Success = 'Success',
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning'
}