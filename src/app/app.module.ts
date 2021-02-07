import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { CoreModule } from 'src/app/core/core.module';

import { LayoutModule } from '../app/layout/layout.module';
import { WelcomeModule } from 'src/app/welcome/welcome.module';



import { AppComponent } from './app.component';

import { NavigationService } from './layout/navigation.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptor/auth-http-interceptor';


import { environment } from '../environments/environment';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HistoryComponent } from './history/history.component';
import { CagnotteComponent } from './cagnotte/cagnotte.component';
import { FormationComponent } from './formation/formation.component';
import { WalletService } from './services/wallet.service';
import { MatAutocompleteModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    TransactionComponent,
    HistoryComponent,
    CagnotteComponent,
    FormationComponent
  ],
  imports: [
    BrowserModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CoreModule,
    LayoutModule,
    WelcomeModule
   
  ],
  exports : [
  ],
  providers: [
    NavigationService,
    WalletService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
