import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {SignUpPage} from "../sign-up/sign-up";

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


  phone: string;
  password: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  goToTabs() {
    this.navCtrl.push(TabsPage);

  }


  updateInput () {
    if (this.phone == undefined || this.phone == "") {
      this.phone = '+380()';
    }
  }

  goToRegistration() {
    this.navCtrl.push(SignUpPage);
  }

/////////////

  isActive = true;
  showPass () {
    this.isActive = !this.isActive;
  }

  showPrompt() {
  let prompt = this.alertCtrl.create({
    title: 'Login',
    message: "Enter a name for this new album you're so keen on adding",
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
