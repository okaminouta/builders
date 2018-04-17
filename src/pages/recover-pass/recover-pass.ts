import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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
export class RecoverPassPage {
  passRecoveryStep = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverPassPage');
  }

  goBack() {
    if(this.passRecoveryStep === 1){
      this.navCtrl.pop();
    } else this.passRecoveryStep--;

  }

  nextStep (){
    if(this.passRecoveryStep === 3){
      console.log('succ')
    } else this.passRecoveryStep++;
  }

}
