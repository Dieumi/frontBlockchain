import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { WelcomeComponent } from './welcome/welcome.component';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HistoryComponent } from './history/history.component';
import { CagnotteComponent } from './cagnotte/cagnotte.component';
import { FormationComponent } from './formation/formation.component';

const routes: Routes = [
  { path: '', redirectTo : 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent },
 
  { path: 'wallet', component : WalletComponent, canActivate: [AuthGuard]},

  { path: 'transaction', component : TransactionComponent, canActivate: [AuthGuard]},

  { path: 'history', component : HistoryComponent, canActivate: [AuthGuard]},

  { path: 'cagnotte', component : CagnotteComponent, canActivate: [AuthGuard]},

  { path: 'formation', component : FormationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes , { useHash: true }),
  ],
  exports: [ RouterModule ]
})
export class RoutingModule {

 }
