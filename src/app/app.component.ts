import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { MatSidenav } from '@angular/material';
import { NavigationService } from '../app/layout/navigation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  innerWidth : number;

  mode: string;
  update:boolean=false;
  constructor(
    private navigationService : NavigationService,
    private iconRegistry: MatIconRegistry
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.updateModeSidenav();
  }

  updateModeSidenav(): void {
    if(this.innerWidth >= 1280) {
      this.mode = "side";
    } else {
      this.mode = "over";
    }
  }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.updateModeSidenav();
    this.navigationService.setSidenav(this.sidenav);

  }
}
