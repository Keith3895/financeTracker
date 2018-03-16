import { Injectable } from '@angular/core';

@Injectable()
export class SmsService {

  constructor() { }
  Transaction(obj){
    const str = obj.body;
    const debit = /(debited)|(deducted)|(charged)|(reduced)/i;
    const credit =/(credited)|(credit)|(added)|(given)/i;
    if(debit.test(str)){
      return Object.assign(this.tokenizer(str),{type:'debit',date:obj.date});
    }else if (credit.test(str)){
      return Object.assign(this.tokenizer(str),{type:'credit',date:obj.date});
    }else{
      return false;
    }
  }
  tokenizer(str: string) {
    return {
      transaction: this.getTransactions(str),
      balance: this.getBallance(str),
      account: this.getAccount(str)
    };
  }
  getTransactions(str: string) {
    const regex = /(rs.)([0-9]*.[0-9]*)/gi
    const tokens = regex.exec(str);
    if(tokens)
    if (tokens[2] != this.getBallance(str)) {
      return tokens[2];
    }
  }
  getBallance(str: string) {
    const regex = [/(bal)/i,
    /(ballance is)/i];
     const val = /(rs.)([0-9]*.[0-9]*)/gi
    for(let i=0;i<regex.length;i++){
      let tokens = regex[i].exec(str);
      if(tokens){
        let subStr = str.substr(tokens.index, str.length);
        return val.exec(subStr)[2];
      }
    
    }
     
  }
  getAccount(str: string) {
    const regex = [
      /a\/c/i,
      /ending/i
    ];
    const numexp = /[0-9]{4}/;
    for (let i = 0; i < regex.length; i++) {
      const token = regex[i].exec(str);
      if (token) {
        let subStr = str.substr(token.index, str.length);
        let test =numexp.exec(subStr);
        if(test)
        return test[0];
      }
    }
  }
}
