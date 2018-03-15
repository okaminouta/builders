import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {
  userData = {
    oldPass: null,
    newPass: null,
    confPass: null
  }


  credCheck() {
    if (this.userData.oldPass === null ||
      this.userData.newPass === null ||
      this.userData.confPass === null
      ) {
      return true
    }

    return false
  }

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePassPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
}
