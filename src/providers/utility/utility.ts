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

  toast (msg: string, cssClass: string, position: string = 'top' ) {
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
    return true;
  }


  cut(data: any) {
    let cred = {
      phone: null,
      password: null
    };
    cred.phone = parseInt( data.phone.substr(3).replace(/[^0-9]/g, ''));
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
          return 'Номер телефону має бути 12 цифер';
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
          return 'Пароль має бути 6-30 символів';
        }
        else {
          return false
        }
      }
    }
  }

}
