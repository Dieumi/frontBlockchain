import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { Router} from '@angular/router';
import { TransactionComponent } from '../transaction/transaction.component';
import { Wallet } from '../core/models/wallet';
import { Transaction } from '../core/models/transaction';
import { SnackService } from '../core/services/snack.service';


export interface WalletServiceInterface {
 

  getWallet() : void;
  sendTransaction(to:string,amount:number):void;
  getHistory(walletId : string);
}



@Injectable({
  providedIn: 'root'
})
export class WalletService implements WalletServiceInterface{
 
  public wallet$ = new BehaviorSubject<Wallet>(null);
  public wallet;
  public transaction$ = new BehaviorSubject<boolean>(null);
  public listTransaction$ = new BehaviorSubject<Transaction[]>(null)
  public loading$ = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient,private snackService:SnackService) { 
    this.getWallet();

  
  }
  getHistory(walletId: string) {
    this.http.get<any>("http://100.24.118.16:8080/wallet/transaction/"+walletId).subscribe(response=>{
    console.log("response"+JSON.stringify(response))
    this.listTransaction$.next(response)

  });
  }
  sendTransaction(id: string, amount: number): void {
    let body ={
      receiver:id,
      levioCoin:amount
    }
    this.loading$.next(true);
    this.http.post<any>("http://100.24.118.16:8080/sendTransaction",body).subscribe(response=>{

      this.transaction$.next(true)
      this.loading$.next(false);
      this.snackService.success("Transaction sent");
      this.getWallet()
    },(error:any)=>{
      this.snackService.error("Transaction refused");
    });
  
  }

  getWallet(): void{
  this.http.get<any>("http://100.24.118.16:8080/wallet").subscribe(response=>{
    console.log("response"+JSON.stringify(response))
    this.wallet=response;
    this.getHistory(this.wallet.id);
    this.wallet$.next(response)

  });

  }

}
