import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {SliderPage} from "../slider/slider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    sentence: string = 'all';
  showSearchbar: boolean = false;

  constructor(public navCtrl: NavController,
              public events: Events) {
    events.subscribe('ionCancel', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome');
    });

  }
  hideSBar () {
    this.showSearchbar = false;
  }

  showSBar () {
    this.showSearchbar = true;
  }



}
