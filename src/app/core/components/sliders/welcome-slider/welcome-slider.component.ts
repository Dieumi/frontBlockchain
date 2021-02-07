import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-slider',
  templateUrl: './welcome-slider.component.html',
  styleUrls: ['./welcome-slider.component.scss']
})
export class WelcomeSliderComponent implements OnInit {

  //parametrable

  @Input() height: string;

  @Input() images: Array<string>;

  @Input() arrows: boolean;


  //no parametrable
  minHeight: string;
  arrowSize: string = '30px';
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  fullscreen: boolean = false;
  public imagesUrl;

  constructor() { }

  ngOnInit() {
    
  }

}
