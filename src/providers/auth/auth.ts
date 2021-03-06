import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestProvider} from "../request.service";
import {tap} from "rxjs/operators";
import {UtilityProvider} from "../utility/utility";
import {UrlProvider} from "../url/url";
import {Storage} from "@ionic/storage";
import {UserProvider} from "../user/user";

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient,
              public util: UtilityProvider,
              public user: UserProvider,
              private url: UrlProvider,
              public storage: Storage,
              private request: RequestProvider) {
  }

  register(data: any) {
    return this.request.post(this.url.signUp, data)
      .pipe(
        tap(
          (res) => {
            this.user.setUser(res.data);
          },
          (err) => {
            this.util.toast('error', 'error');
            console.log(err)
          })
      )
  }

  login(data: any) {
    return this.request.post(this.url.signIn, data)
      .pipe(
        tap(
          (res) => {
            this.user.setUser(res.user);
          },
          (err) => {
            this.util.toast('error', 'error');
            console.log(err)
          })
      )
  }

  logout() {
    return this.storage.remove('user').then(() => {
      return this.request.post(this.url.logOut, {});
    })
  }

  recoverPassword() {
    return {
      stepOne: (phone:string) => {
        return this.request.post(this.url.passRecovery.stepOne, {
          phone: phone
        }).pipe(
          tap(
            () => {
              this.util.toast('Повідомлення відправлено', 'success');
            },
            (err) => {
              this.util.toast('error', 'error');
              console.log(err)
            })
        )
      },
      stepTwo: (code:string) => {
        return this.request.post(this.url.passRecovery.stepTwo, {
          code: code,
        }).pipe(
          tap(
            () => {
            },
            (err) => {
              this.util.toast('error', 'error');
              console.log(err)
            })
        )
      },
      stepTree: (code: string, password: string) => {
        return this.request.post(this.url.passRecovery.stepTree, {
          code: code,
          password: password,
        }).pipe(
          tap(
            (res) => {
              this.util.toast(res, 'success');
            },
            (err) => {
              this.util.toast(err.error, 'error');
              console.log(err)
            })
        )
      },
    }
  }


}
