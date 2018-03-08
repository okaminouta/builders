import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UtilityProvider} from "../utility/utility";
import {UserProvider} from "../user/user";
import {Storage} from "@ionic/storage";

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {
  authKey: string;
  headers = {};

  constructor(public http: HttpClient,
              public util: UtilityProvider,
              private storage: Storage) {

    console.log('Hello RequestProvider Provider');

    this.storage.get('user').then((data) => {
      if (data) {
        this.authKey = 'Bearer ' + data.api_token;
        this.headers = {
          headers: {
            "Authorization": this.authKey
          }
        }
      } else {
        this.headers = {};
      }
    });
  }


  get() {

  }

  post(url, data) {
    console.log(this.headers,'qweqwe')
    let promise = new Promise((resolve, reject) => {
      this.http.post(url, data, this.headers)
        .subscribe(
          response => {
            // console.log(response);
            resolve(response);

          },
          err => {
            // console.log(err);
            reject(err);
            return err;
          });
    });
    return promise.then(data => {
        console.log(data, 'data');
        return data
      },
      err => {
        console.log(err, 'err');
        // this.util.toast(err.error.message, 'alert');


        // return err;
      });
  }

  put() {

  }

  resolve(res: any) {

  }

  reject(res: any) {

  }

}
