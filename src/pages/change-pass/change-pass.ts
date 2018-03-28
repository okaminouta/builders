import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

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

  changePass() {
    this.user.changePass({
      old_password: this.userData.oldPass,
      new_password: this.userData.newPass
    });
  }

  constructor(public navCtrl: NavController,
              public user: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePassPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
}
