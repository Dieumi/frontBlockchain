import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private sidenav: MatSidenav;

  public open(){
    this.sidenav.open();
  }

  public close() {
    this.sidenav.close();
  }

  public toggle(){
    this.sidenav.toggle();
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  constructor() { }
}
