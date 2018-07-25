import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AddAccountService } from '../../../service/add-account.service';
import { SnackBarService } from '../../../service/snack-bar.service';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  @Output() visibleChange: EventEmitter<boolean>  = new EventEmitter();
  overrideBalance = false;
  constructor(private addAcc : AddAccountService,private snack : SnackBarService) { }
  disableBtn;
  ngOnInit() {
  }

  cancel(){
    this.visibleChange.emit(false);
  }

  addAccount(obj){
    if(obj.valid && obj.touched){
      console.log(obj.value); 
      this.addAcc.addAccount(obj.value).subscribe(res => {
        this.snack.success('saved successfully');
      },error => {
        this.snack.error(error);
      });
      this.cancel();
    }
   }
}
