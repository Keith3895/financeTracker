import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class SnackBarService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;
    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }
 
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
 
    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }
 
    error(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }
 
    info(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }
 
    warn(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }
 
    alert(type: AlertType, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
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