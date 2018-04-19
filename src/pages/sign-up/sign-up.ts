import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";
import {ProfilePage} from "../profile/profile";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  isActive = true;
  userData = {
    phone: null,
    password: null,
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthProvider,
              public util: UtilityProvider) {
  }

  register() {
    if (this.util.credentialsCheck(this.userData)) {
      this.auth.register(this.userData).subscribe(() => this.navCtrl.push(ProfilePage));
    }
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  showPass() {
    this.isActive = !this.isActive;
  }
}
