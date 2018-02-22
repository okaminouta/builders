import {Component, ElementRef, HostBinding} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  // @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private elRef: ElementRef) {
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad SignUpPage');
  }

 register () {
    this.navCtrl.push(TabsPage)
 }

}
