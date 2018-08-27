import { Component, OnInit, Input } from '@angular/core';
import { CordovaService } from '../../service/cordova/cordova.service';

@Component({
  selector: 'app-scan-confirm',
  templateUrl: './scan-confirm.component.html',
  styleUrls: ['./scan-confirm.component.scss']
})
export class ScanConfirmComponent implements OnInit {
  @Input() smsConfirmVisible;
  @Input() modalVisable=true;
  showSpinner= false;
  constructor(public cordovaService: CordovaService) { }

  ngOnInit() {
  }
  startScan(){
    this.showSpinner = true;
    let that = this;
    this.cordovaService.readMessages().then(res=>{
      console.log("res",res);
      that.modalVisable=false;
    }).catch(err=>{
      console.log(err);
    });
  }
}
