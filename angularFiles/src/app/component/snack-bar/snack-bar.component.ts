import { Component, OnInit } from '@angular/core';
import { SnackBarService, Alert, AlertType } from '../../service/snack-bar.service';
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  alerts: Alert[] = [];
  toggleSnackBar = true;
  
  constructor(private snack: SnackBarService) {
    this.snack.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = [];
        return;
      }
      this.alerts.push(alert);
      setTimeout(() => {
        this.alerts = [];
        this.toggleSnackBar = !this.toggleSnackBar;
      }, 3000);
    });
  }

  ngOnInit() {

  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }
    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'snackbar show alert-success';
      case AlertType.Error:
        return 'snackbar show  alert-danger';
      case AlertType.Info:
        return 'snackbar show  alert-info';
      case AlertType.Warning:
        return 'snackbar show  alert-warning';
    }
  }
}
