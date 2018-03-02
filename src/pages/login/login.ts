import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {SignUpPage} from "../sign-up/sign-up";
import {SliderPage} from "../slider/slider";
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    userData = {
        phone: null,
        password: null,
    };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public util: UtilityProvider,
              public  user: UserProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  goToTabs() {
    if (this.util.credentialsCheck(this.userData)){
        this.user.login(this.userData).then((res)=> {
            console.log(res,'logged');
            this.navCtrl.push(TabsPage);
        });
    }
  }


  updateInput () {
    if (this.userData.phone == undefined || this.userData.phone == "") {
        this.userData.phone = '+380()';
    }
  }

  goToRegistration() {
    this.navCtrl.push(SignUpPage);
  }

  goToSlider() {
    this.navCtrl.push(SliderPage);
  }

/////////////

  isActive = true;
  showPass () {
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
