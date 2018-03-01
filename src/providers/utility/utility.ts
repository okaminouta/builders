import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  constructor(public http: HttpClient,
              public toastCtrl: ToastController,) {
    console.log('Hello UtilityProvider Provider');
  }

  toast (msg: string, cssClass: string, position: string = 'middle' ) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: position,
      duration: 3000,
      cssClass: cssClass,
      dismissOnPageChange: true
    });
    toast.present();
  }

  credentialsCheck(data: any) {
    if (!data.phone || !data.password){
      this.toast('Заполните все поля', 'alert');
      return false;
    }
    if (data.phone.length !== 9) {
      console.log('failed 1',data.phone,data.phone.length )
      this.toast('Длинна номера телефона должна быть 9 цифр', 'alert');
      return false;
    }
    if (data.password.length < 6 || data.password.length > 15) {
      console.log('failed 2')
      this.toast('Длинна пароля должна быть от 6  до 9 цифр', 'alert');
      return false;
    }
    return true;
  }

}
