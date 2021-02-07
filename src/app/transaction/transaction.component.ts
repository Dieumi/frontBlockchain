import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { WalletService } from '../services/wallet.service';
import {map, startWith} from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { Transaction } from '../core/models/transaction';
import { SnackService } from '../core/services/snack.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  public solde ;
  public wallet;

  public loading:Observable<boolean>;
  options: User[];
  filteredOptions: Observable<User[]>;
  transactionForm : FormGroup = new FormGroup({
    'amountToSend': new FormControl('', [Validators.required,Validators.pattern("[0-9]+[.]?[0-9]+")]),
    'username': new FormControl('', [Validators.required])
  });

  constructor(private walletService : WalletService,private userService : UserService, private snackService : SnackService) {

    this.loading=this.walletService.loading$.asObservable()
   }

  ngOnInit() {
  
    this.walletService.wallet$.subscribe(
      res=>{
        if(res!==null){
          this.wallet=res;
          this.solde=res.solde
        }
     

      }
    )
    this.userService.listOfUser$.subscribe(
      res=>{

        if(res!==null){
         this.options=res;
         this.filteredOptions = this.transactionForm.get("username").valueChanges
         .pipe(
           startWith(''),
           map(value => typeof value === 'string' ? value : value.name),
           map(name => name ? this._filter(name) : this.options.slice())
         );
        }
     

      }
    )
   
  }
  displayFn(user: User): string {
    return user.id && user.username ? user.username : '';
  }

  submitTransaction():void { 
    if(this.transactionForm.valid){
  
      this.walletService.sendTransaction(this.transactionForm.get("username").value.id,this.transactionForm.get("amountToSend").value);
    
    }

  }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.username.toLowerCase().indexOf(filterValue) === 0);
  }
  
}
