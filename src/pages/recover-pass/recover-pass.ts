import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RecoverPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recover-pass',
  templateUrl: 'recover-pass.html',
})
export class RecoverPassPage implements OnInit {
  passRecoveryStep = 1;
  timer = 60;
  phone: string;
  code = '';
  password = '';
  id: number;

  ngOnInit() {
    this.user.getPhone().then((res) => {
      this.phone = res + '';
    })
  }

  constructor(public navCtrl: NavController,
              public user: UserProvider,
              public auth: AuthProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverPassPage');
  }

  goBack() {
    if (this.passRecoveryStep === 1) {
      this.navCtrl.pop();
    } else this.passRecoveryStep--;

  }

  startTimer() {
    setInterval(() => {
      if (this.timer != 0) this.timer--;
    }, 1000);
  }

  nextStep() {
    if (this.passRecoveryStep === 1) {
      this.auth.recoverPassword().stepOne(this.phone).subscribe(()=>{
        this.passRecoveryStep++;
      })
    }
    if (this.passRecoveryStep === 2) {
      this.auth.recoverPassword().stepTwo(this.code).subscribe((res)=>{
        this.id = res;
        this.passRecoveryStep++;
      })
    }
    if (this.passRecoveryStep === 3) {
      this.auth.recoverPassword().stepTree(this.id, this.password).subscribe(()=>{
        this.navCtrl.push(LoginPage);
      })
    }
  }

  sendAgain() {
    this.timer = 60;
  }

  disableForwardButton() {
    if (this.phone !== undefined && this.passRecoveryStep === 1) return this.phone.length < 9;
    if (this.passRecoveryStep === 2) return this.code.length < 4;
    if (this.passRecoveryStep === 3) return this.password.length < 6;
  }

  test() {
    console.log(typeof(this.phone))
  }


}
