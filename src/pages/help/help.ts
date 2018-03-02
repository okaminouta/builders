import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  message: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  disableSendButton () {
    if (!this.message && !this.message.length && this.message.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  goBack () {
    this.navCtrl.pop();
  }
// todo do smth here
  ionViewDidLeave() {
    this.navCtrl.popToRoot();
  }

}
