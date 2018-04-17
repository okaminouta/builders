import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {SignUpPage} from "../sign-up/sign-up";
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";
import {RecoverPassPage} from "../recover-pass/recover-pass";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userData = {
    phone: null,
    password: null
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public util: UtilityProvider,
              public  user: UserProvider) {
  }

  login() {
    if (this.util.credentialsCheck(this.userData)) {
      this.user.login(this.userData).subscribe((res: any) => {
        localStorage.token = res['user']['api_token'];
        this.user.firstEnter().setFalse();
        this.navCtrl.push(TabsPage);
      });
    }
  }

  goToRegistration() {
    console.log('Naw ctrl', this.navCtrl);
    this.navCtrl.push(SignUpPage);
  }

  forgotPass() {
    this.navCtrl.push(RecoverPassPage);
  }


/////////////

  isActive = true;

  showPass() {
    this.isActive = !this.isActive;
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: '<h1>hel</h1>',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Saved clicked');
            this.navCtrl.push(TabsPage);
          }
        }
      ]
    });
    prompt.present();
  }

}
