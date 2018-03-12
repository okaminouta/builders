import {Component, ElementRef, HostBinding} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {UserProvider} from "../../providers/user/user";

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
  userData = {
    phone: '+380',
    password: null,
  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider) {
    // sometimes falls here wtf
    // this.userData.name = null;
    // this.userData.pass = null;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad SignUpPage');
  }

 register () {
    this.userProvider.register(this.userData).then( (data: any) => {
      console.log(data,'signupdata')
    });
    // console.log('test',test)

    this.navCtrl.push(TabsPage);
 }

  updateInput () {
    if (this.userData.phone == undefined || this.userData.phone == "") {
      this.userData.phone = '+380()';
    }
  }

  goToLogin () {
    this.navCtrl.push(LoginPage);
  }

  isActive = true;
  showPass () {
    this.isActive = !this.isActive;
  }

}
