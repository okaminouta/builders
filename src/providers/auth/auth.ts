import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestProvider} from "../request.service";
import {tap} from "rxjs/operators";
import {UtilityProvider} from "../utility/utility";
import {UrlProvider} from "../url/url";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient,
              public util: UtilityProvider,
              private url: UrlProvider,
              private request: RequestProvider) {
    console.log('Hello AuthProvider Provider');
  }

  recoverPassword() {
    return {
      stepOne: (phone) => {
        return this.request.post(this.url.passRecovery.stepOne, {
          phone: phone
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
      stepTwo: (code) => {
        return this.request.post(this.url.passRecovery.stepTwo, {
          code: code
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
      stepTree: (id, password) => {
        return this.request.post(this.url.passRecovery.stepTree, {
          id: id,
          password: password
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
    }
  }


}
