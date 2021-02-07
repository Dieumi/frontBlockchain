import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
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
