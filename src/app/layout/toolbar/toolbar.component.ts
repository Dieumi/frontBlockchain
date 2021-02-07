import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../core/components/dialog/auth-dialog/auth-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public isLogged : Observable<boolean>;
  public toggleSidenav(){
    this.navigationService.toggle();
  }

  public isUserConnected(){
    return this.userService.isConnected();
  }

  public showToggleSidenav() {
    if(this.router.url === '/welcome') {
      return false;
    }
    return true;
  }

  public openDialog(){
    this.dialog.open(AuthDialogComponent);
  }

  public logout(){
    this.userService.logout();
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.navigationService.close();
  
  }

  constructor(
    private navigationService : NavigationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.isLogged=this.userService.isLogged$.asObservable()
   }

  ngOnInit() {
    
  }

}
