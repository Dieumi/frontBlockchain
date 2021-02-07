import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Transaction } from '../core/models/transaction';
import { User } from '../core/models/user';
import { Wallet } from '../core/models/wallet';
import { WalletService } from '../services/wallet.service';

export class TransactionToDisplay {
  _id : string;
  levioCoinSent: number;
  levioCoinReceived : number;
  receiver : string;
  sender : string;
  date: Date;
}
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit,AfterViewInit  {
  public solde ;
  public wallet : Wallet;
  displayedColumns: string[] = ['source', 'reason', 'levioCoinSent', 'levioCoinReceived','destination','date'];



  public ELEMENT_DATA: TransactionToDisplay[] =[]
  dataSource = new MatTableDataSource<TransactionToDisplay>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private walletService : WalletService) {

    
   }
 
  ngOnInit() {
  
    this.walletService.wallet$.subscribe(
      res=>{
       
        if(res!==null){
          this.wallet=res;
          this.solde=res.solde
          this.walletService.listTransaction$.subscribe(res2=>{
              const currentUser :User = JSON.parse(localStorage.getItem("user"))
              if(res2!==null){
                res2.forEach(transaction => {
                  const transactionToDisplay : TransactionToDisplay = {
                      _id:transaction._id,
                      date:transaction.date,
                      sender:transaction.sender.user.username,
                      receiver: transaction.receiver.user.username,
                      levioCoinReceived:0,
                      levioCoinSent:0
                  }
                  
                  if(transaction.sender.user.id==currentUser.id){
                    transactionToDisplay.levioCoinSent=transaction.levioCoin
                  }else{
                    transactionToDisplay.levioCoinReceived=transaction.levioCoin
                  }
                  this.ELEMENT_DATA.push(transactionToDisplay)
                });
                this.ELEMENT_DATA.sort((a,b)=>{
                  return new Date(b.date).getTime() - new Date(a.date).getTime()
                })
                console.log("CAROTTE"+JSON.stringify(this.ELEMENT_DATA))
                this.dataSource=new MatTableDataSource<TransactionToDisplay>(this.ELEMENT_DATA);
              }
          })
        }
     

      }
    )
   

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
