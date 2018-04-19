import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';


@Injectable()
export class UtilityProvider {


  constructor(              public toastCtrl: ToastController,) {
  }


  toast( msg: string,cssClass: string = 'error', position: string = 'top', ) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: position,
      cssClass: cssClass,
      duration: 3000,
      dismissOnPageChange: false
    });
    toast.present();
  }

  credentialsCheck(data: any) {

    if (!data.phone || !data.password) {
      this.toast('Заповніть всі поля', 'error');
      return false;
    }
    if (data.phone.length != 9) {
      this.toast('Номер телефону має бути 12 цифр', 'error');
      return false;
    }
    if (data.password.length < 6 || data.password.length > 15) {
      this.toast('Пароль має бути 6-15 символів', 'error');
      return false;
    }
    return true;
  }


  // cut(data: any) {
  //   let cred = {
  //     phone: null,
  //     password: null
  //   };
  //   cred.phone = parseInt(data.phone.substr(3).replace(/[^0-9]/g, ''));
  //   cred.password = data.password;
  //   return cred;
  // }

  // validation(form: any) {
  //   return {
  //     phone: () => {
  //       if (form.controls.phone.errors &&
  //         form.controls.phone.errors.required &&
  //         form.controls.phone.dirty) {
  //         return 'Це поле є обов\'язковим!';
  //       }
  //       else if (form.controls.phone.dirty &&
  //         form.controls.phone.errors &&
  //         form.controls.phone.errors.minlength ||
  //         form.controls.phone.dirty &&
  //         form.controls.phone.errors &&
  //         form.controls.phone.errors.maxlength) {
  //         return 'Номер телефону має бути 12 цифер';
  //       }
  //       else {
  //         return false
  //       }
  //     },
  //     password: () => {
  //       if (form.controls.password.errors &&
  //         form.controls.password.errors.required &&
  //         form.controls.password.dirty) {
  //         return 'Це поле є обов\'язковим!';
  //       }
  //       else if (form.controls.password.dirty &&
  //         form.controls.password.errors &&
  //         form.controls.password.errors.minlength ||
  //         form.controls.password.dirty &&
  //         form.controls.password.errors &&
  //         form.controls.password.errors.maxlength) {
  //         return 'Пароль має бути 6-30 символів';
  //       }
  //       else {
  //         return false
  //       }
  //     }
  //   }
  // }

}
