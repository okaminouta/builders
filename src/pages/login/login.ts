import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {SignUpPage} from "../sign-up/sign-up";
import {SliderPage} from "../slider/slider";
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfilePage} from "../profile/profile";


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
    phone: '+380 (__) __-__-___',
    password: null
  };
  validation: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public util: UtilityProvider,
              public  user: UserProvider,
              public formBuilder: FormBuilder) {
   this.user.firstEnter().get().then((data)=>{
      if(!data){
        this.navCtrl.push(SliderPage);
        this.user.firstEnter().setTrue();
      }
    });
    this.validation = this.util.validation;
  }

  loginForm = this.formBuilder.group({
    phone: ['', Validators.compose([
      Validators.maxLength(19),
      Validators.minLength(19),
      Validators.required])],
    password: ['', Validators.compose([
      Validators.maxLength(30),
      Validators.minLength(6),
      Validators.required])]
  });


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
    debugger;
  login() {
    //debugger;
    console.log(this.loginForm)
    if (this.util.credentialsCheck(this.userData) && this.loginForm.valid) {
      this.user.login(this.util.cut(this.userData)).then((res: any) => {
        if (res) {
            this.navCtrl.push(ProfilePage);
        }
      });
    }
  }

  goToRegistration() {
    console.log('Naw ctrl', this.navCtrl);
    this.navCtrl.push(SignUpPage);
  }

  forgotPass () {
    this.navCtrl.push(TabsPage);
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
