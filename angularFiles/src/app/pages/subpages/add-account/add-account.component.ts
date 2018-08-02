import { Component, OnInit, EventEmitter, Output,ViewChild } from '@angular/core';
import { AddAccountService } from '../../../service/addAccount/add-account.service';
import { SnackBarService } from '../../../service/snackBar/snack-bar.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  @Output() closeDialog: EventEmitter<boolean>  = new EventEmitter();
  @ViewChild('addForm')  ngForm :NgForm;
  bankName;
  accountNumber;
  balance;
  mobileNumber;
  overrideBalance = false; //default value of toggle switch
  constructor(private addAcc : AddAccountService,private snack : SnackBarService) { }
  ngOnInit() {
  }

  cancel(){
    this.closeDialog.emit(false);   //to close the dialog
  }
/**
 * add account information into database 
 * @param obj:ngForm inputForm Object
 */
  addAccount(obj){
      if(obj.valid && obj.touched){
        this.addAcc.addAccount(obj.value).subscribe(res => {
          this.snack.success('saved successfully');
        },error => {
          this.snack.error(error.error.errorMessage);
        });
        this.cancel();
      }
   }
}
