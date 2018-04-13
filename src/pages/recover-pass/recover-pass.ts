import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

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
export class RecoverPassPage implements OnInit{
  passRecoveryStep = 1;
  timer = 60;
  phone: string;
  code='';
  password = '';

  ngOnInit (){
    this.user.getPhone().then((res)=>{
      this.phone=res+'';
    })
  }

  constructor(public navCtrl: NavController,
              public user: UserProvider,
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
    if (this.passRecoveryStep === 3) {
      console.log('succ')
    } else this.passRecoveryStep++;
  }

  sendAgain () {
    this.timer=60;
  }

  disableForwardButton (){
    if (this.phone !== undefined && this.passRecoveryStep === 1)return this.phone.length < 9;
    if (this.passRecoveryStep === 2)return this.code.length < 4;
    if (this.passRecoveryStep === 3)return this.password.length < 6;
  }

  test(){
    console.log(typeof(this.phone))
  }


}
