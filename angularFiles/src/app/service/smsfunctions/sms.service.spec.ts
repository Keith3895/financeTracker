import { TestBed, inject, async } from '@angular/core/testing';
import { AddAccountService } from '../addAccount/add-account.service';
import { SmsService } from './sms.service';
let SmsText = "Rs.15000 is Credited to A/c ...7992 on 27-06-18 19:11:01 (Avlbl Bal Rs.17834.92) AT MUMBAI MAIN OFFICE,MUMBAI. Now 15G/H submission digitally enabled";
describe('SmsService', () => {
  let service:SmsService;
  let add: AddAccountService;
  beforeEach(() => {
    service = new SmsService(add);
    TestBed.configureTestingModule({
      providers: [SmsService]
    });
  });
  it("Transaction method with correct input",()=>{
    let test = service.Transaction({
      body:SmsText
    });
    expect(test).toBeDefined();
  });
  it("Transaction method with non positve input.",()=>{
    let test = service.Transaction({
      body:"SmsText as some random text."
    });
    expect(test).toBeFalsy();
  });
  it('GetTransatcion method with correct input',async(()=>{
    let test = service.getTransactions(SmsText);
    expect(test).toBeUndefined();
  }));
  it('GetTransatcion method with wrong input',()=>{
    let test = service.getTransactions("SmsText");
    expect(test).toBeUndefined()
  });
});
