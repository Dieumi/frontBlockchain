import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public sliderImages;

  constructor() { }
  
  

  ngOnInit() {

    this.sliderImages = [
      "https://i1.wp.com/www.casserolenova.com/wp-content/uploads/2018/08/Case-titre-1500x900.jpg?resize=1080%2C648&ssl=1",
      "https://mma.prnewswire.com/media/1276375/Levio_Levio_se_positionne_comme_leader_en_acqu_rant_deux_entrepr.jpg?p=facebook"
      ,  
      ];
}

 

}
