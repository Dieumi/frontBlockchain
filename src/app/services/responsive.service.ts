import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  getSizeWindow(): number{
    return window.innerWidth;
  }

  getNbCols(): number{
    if(window.innerWidth >= 1920){
      return 5;
    } else if(window.innerWidth >= 1280) {
      return 4;
    } else if(window.innerWidth >= 960) {
      return 3;
    } else if(window.innerWidth >= 600) {
      return 2;
    } else {
      return 1;
    }
  }

  constructor() { }
}
