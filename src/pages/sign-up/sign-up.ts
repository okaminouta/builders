import {Component, ElementRef, HostBinding} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {UserProvider} from "../../providers/user/user";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilityProvider} from "../../providers/utility/utility";
import {ProfilePage} from "../profile/profile";

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
  validation: any;
  userData = {
    phone: '+380 (__) __-__-___',
    password: null,
  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public util: UtilityProvider,
              public userProvider: UserProvider) {
    this.validation = this.util.validation;
    // sometimes falls here wtf
    // this.userData.name = null;
    // this.userData.pass = null;
  }

  registerForm = this.formBuilder.group({
    phone: ['', Validators.compose([
      Validators.maxLength(14),
      Validators.minLength(14),
      Validators.required])],
    password: ['', Validators.compose([
      Validators.maxLength(30),
      Validators.minLength(6),
      Validators.required])]
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  register() {
    if (this.util.credentialsCheck(this.userData) && this.registerForm.valid) {
      this.userProvider.register(this.util.cut(this.userData)).then((res: any) => {
        if (res) {
          console.log(res,'res sight')
          this.navCtrl.push(ProfilePage);
        }
      });


    }
  }

  // updateInput() {
  //     if (this.userData.phone == undefined || this.userData.phone == "") {
  //         this.userData.phone = '+380()';
  //     }
  // }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  isActive = true;

  showPass() {
    this.isActive = !this.isActive;
  }

}
