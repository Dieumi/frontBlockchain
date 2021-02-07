import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-cagnotte',
  templateUrl: './cagnotte.component.html',
  styleUrls: ['./cagnotte.component.scss']
})
export class CagnotteComponent implements OnInit {
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
