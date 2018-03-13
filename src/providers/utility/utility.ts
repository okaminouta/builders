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
    if (data.phone.length !== 14) {
      console.log('failed 1',data.phone,data.phone.length );
      this.toast('Длинна номера телефона должна быть 9 цифр', 'alert');
      return false;
    }
    if (data.password.length < 6 || data.password.length > 15) {
      console.log('failed 2');
      this.toast('Длинна пароля должна быть от 6  до 15 цифр', 'alert');
      return false;
    }
    return true;
  }


  cut(data: any) {
    let cred = {
      phone: null,
      password: null
    };
    cred.phone = parseInt(data.phone.replace(/[^0-9]/g, ''));
    cred.password = data.password;
    return cred;
  }

  validation (form:any) {
    return {
      phone: () => {
        if (form.controls.phone.errors &&
          form.controls.phone.errors.required &&
          form.controls.phone.dirty) {
          return 'Це поле є обов\'язковим!';
        }
        else if (form.controls.phone.dirty &&
          form.controls.phone.errors &&
          form.controls.phone.errors.minlength ||
          form.controls.phone.dirty &&
          form.controls.phone.errors &&
          form.controls.phone.errors.maxlength) {
          return 'length 9';
        }
        else {
          return false
        }
      },
      password: () => {
        if (form.controls.password.errors &&
          form.controls.password.errors.required &&
          form.controls.password.dirty) {
          return 'Це поле є обов\'язковим!';
        }
        else if (form.controls.password.dirty &&
          form.controls.password.errors &&
          form.controls.password.errors.minlength ||
          form.controls.password.dirty &&
          form.controls.password.errors &&
          form.controls.password.errors.maxlength) {
          return 'length 6-30';
        }
        else {
          return false
        }
      }
    }
  }

}
