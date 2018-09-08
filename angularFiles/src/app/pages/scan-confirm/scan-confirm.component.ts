import { Component, OnInit, Input } from '@angular/core';
import { CordovaService } from '../../service/cordova/cordova.service';
import { SmsService } from '../../service/smsfunctions/sms.service';
import { AddAccountService } from '../../service/addAccount/add-account.service';

@Component({
  selector: 'app-scan-confirm',
  templateUrl: './scan-confirm.component.html',
  styleUrls: ['./scan-confirm.component.scss']
})
export class ScanConfirmComponent implements OnInit {
  @Input() smsConfirmVisible;
  @Input() modalVisable = true;
  accountText;
  msgList;
  showSpinner = false;
  constructor(public cordovaService: CordovaService,
    private smsService: SmsService,
    private addAccount:AddAccountService) { }

  ngOnInit() {
  }
  startScan() {
    this.showSpinner = true;
    let that = this;
    this.cordovaService.readMessages().then(res => {
      // console.log("res",res);
      // that.modalVisable=false;
      this.msgList = res;
      this.smsService.findNewAccount(res).then((NewAccount: Array<Object>) => {
        if (NewAccount.length == 1)
          this.accountText = `Found Transactions for the acount number ending with : ${NewAccount[0]},`;
        else if (NewAccount.length > 1) {
          this.accountText = `Found Transactions for the acount number ending with : `;
          NewAccount.map(el => {
            this.accountText += `<strong>${el}</strong>, `;
          });
          this.accountText += "Please add these accounts to record the transactions."
        }else{
          this.addAccount.addBulkTransaction(this.msgList).subscribe(res=>{
            that.modalVisable=false;
          });
        }
      });
    }).catch(err => {
      console.log(err);
    });
  }

}
