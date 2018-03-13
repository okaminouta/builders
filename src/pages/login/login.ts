import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {SignUpPage} from "../sign-up/sign-up";
import {SliderPage} from "../slider/slider";
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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
  // loginForm: FormGroup;

  userData = {
    phone: null,
    password: null
  };
  validation: any;




  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public util: UtilityProvider,
              public  user: UserProvider,
              public formBuilder: FormBuilder) {
    this.validation = this.util.validation;

  }

  loginForm = this.formBuilder.group({
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
    console.log('ionViewDidLoad LoginPage');

  }

  login() {
    console.log(this.loginForm)
    if (this.util.credentialsCheck(this.userData)) {
      debugger
      this.user.login(this.util.cut(this.userData)).then((res: any) => {
        if (res) {
          this.navCtrl.push(TabsPage);
        }
      });
    }
  }


  // updateInput() {
  //   if (this.userData.phone == undefined || this.userData.phone == "") {
  //     this.userData.phone = '+380()';
  //   }
  // }

  goToRegistration() {
    console.log('Naw ctrl', this.navCtrl);
    this.navCtrl.push(SignUpPage);
  }

  goToSlider() {
    this.navCtrl.push(SliderPage);
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
