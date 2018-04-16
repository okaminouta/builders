import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: UtilityProvider,
              public user: UserProvider) {
    // this.message = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  sendMessage() {
    this.user.contacktSupport({
      description: this.message
    }).subscribe((res)=> {
      if(res){
        this.message = '';
        this.util.toast('Повідомлення відправлено', 'success')
      }
    });
  }

  disableSendButton() {
    if (!this.message && !this.message.length && this.message.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

// todo do smth here
  ionViewDidLeave() {
    this.navCtrl.popToRoot();
  }

}
