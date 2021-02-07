import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  public solde ;
  public wallet;
  constructor(private walletService : WalletService) {

    
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

  }

}
