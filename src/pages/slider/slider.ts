import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";

/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  tolog () {
    this.navCtrl.push(SignUpPage);
  }

}
