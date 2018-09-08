import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemService } from '../system/system.service';
import { AddAccountService } from '../addAccount/add-account.service';
@Injectable()
export class SmsService {
  systemService;
  constructor(private http: HttpClient,
    private addAccount: AddAccountService) {
    this.systemService = new SystemService();
  }
  Transaction(obj) {
    const str = obj.body;
    const debit = /(debited)|(deducted)|(charged)|(reduced)/i;
    const credit = /(credited)|(credit)|(added)|(given)/i;
    if (debit.test(str)) {
      return Object.assign(this.tokenizer(str), { type: 'debit', date: obj.date });
    } else if (credit.test(str)) {
      return Object.assign(this.tokenizer(str), { type: 'credit', date: obj.date });
    } else {
      return false;
    }
  }
  tokenizer(str: string) {
    return {
      transaction: this.getTransactions(str),
      balance: this.getBalance(str),
      account: this.getAccount(str)
    };
  }
  getTransactions(str) {
    // console.log(/[0-9]*,[0-9]*.[0-9]*/.test(str),":",str);
    if (/[0-9]*,[0-9]*.[0-9]*/.test(str)) { // method checks if ',' is there in the amount.
      let regex = /(rs.|INR)\s*([0-9]*,[0-9]*.[0-9]*)/gi
      let tokens = regex.exec(str);
      if (tokens)
        if (parseFloat(tokens[2]) != this.getBalance(str)) {
          try {

            return tokens[2];
          } catch (e) {

            return 0;
          }
        }
    } else {
      let regex = /(rs.|INR)([0-9]*.[0-9]*)/gi
      let tokens = regex.exec(str);
      if (tokens)
        if (parseFloat(tokens[2]) != this.getBalance(str)) {
          try {

            return parseFloat(tokens[2]);
          } catch (e) {

            return 0;
          }
        }
    }
  }
  getBalance(str) {
    const regex = [/(bal)\s*/i,
      /(ballance is)\s*/i,
      /(balance is)\s*/i,
      /(bal:)\s*/i];
    const val = [/(rs.|INR)\s*([0-9]*,[0-9]*.[0-9]*)/gi,
      /(rs.|INR)([0-9]*.[0-9]*)/gi]
    for (let i = 0; i < regex.length; i++) {
      let tokens = regex[i].exec(str);
      if (tokens) {
        let subStr = str.substr(tokens.index, str.length);
        try {
          if (/[0-9]*,[0-9]*.[0-9]*/.test(subStr)) {
            return val[0].exec(subStr)[2];
          } else {
            return val[1].exec(subStr)[2];
          }
          // return returnValue;
        } catch (e) {

          return 0;
        }
      }

    }
  }
  getAccount(str) {
    const regex = [
      /a\/c/i,
      /ending/i
    ];
    const numexp = /[0-9]{4}/;
    for (let i = 0; i < regex.length; i++) {
      const token = regex[i].exec(str);
      if (token) {
        let subStr = str.substr(token.index, str.length);
        let test = numexp.exec(subStr);
        if (test)
          return test[0];
      }
    }
  }
  findNewAccount(list) {
    return new Promise((resolve, reject) => {
      this.addAccount.getAccount().subscribe((res: Array<String>) => {
        let accEx = [];
        accEx = res.map(el => {
          return el['accountNumber'];
        });
        let AccScaned = [];
        list.map(el => {
          if (!accEx.includes(el.account)) {
            AccScaned.push(el.account);
            accEx.push(el.account);
          }
        });
        resolve(AccScaned);
      },error=>{
        reject(error);
      });
    });
    // let accEx = [];

  }
}
