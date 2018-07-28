import { Component, OnInit, EventEmitter, Output, ElementRef,ViewChild } from '@angular/core';
import { AddAccountService } from '../../../service/add-account.service';
import { SnackBarService } from '../../../service/snack-bar.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  @Output() visibleChange: EventEmitter<boolean>  = new EventEmitter();
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
    this.visibleChange.emit(false);   //to close the dialog
  }

  //add account information into database 
  addAccount(obj){
    console.log(obj.value);
    // return;
    if(obj.valid && obj.touched){
      this.addAcc.addAccount(obj.value).subscribe(res => {
        this.snack.success('saved successfully');
      },error => {
        this.snack.error(error);
      });
      this.cancel();
    }
   }
}
