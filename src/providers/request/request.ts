import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UtilityProvider} from "../utility/utility";
import {UserProvider} from "../user/user";
import {Storage} from "@ionic/storage";
import {RequestOptions} from "@angular/http";

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {
  authKey: string;
  options: any;

  // headers = new Headers();


  constructor(public http: HttpClient,
              public util: UtilityProvider,
              private storage: Storage) {

    console.log('Hello RequestProvider Provider');


    // let opts = new RequestOptions();
    // opts.headers = headers;

  }


  getAuthkey() {
    this.storage.get('user').then((data) => {
      if (data) {
        this.authKey = 'Bearer ' + data.api_token;
        this.options = {
          headers: {
            "Authorization": this.authKey
          }
        }
      } else {
        this.options = {};
      }
    });

  }

  get(url) {
    this.getAuthkey();
    let promise = new Promise((resolve, reject) => {
      this.http.get(url, this.options)
        .subscribe(
          response => {
            resolve(response);

          },
          err => {
            reject(err);
          });
    });
    return promise.then(data => {
        console.log(data, 'data');
        return data
      },
      err => {
        console.log(err, 'err');
      });
  }

  // this.headers
  // headders = new Headers({'Authorization':'Bearer gb75QQW9Kkn092sDTmfRMyBLlufdfty1oIl9G4O2U0JjPTsBlVxIi4lmNCfb'});


  post(url, data) {
    // this.headers.append('Authorization', 'Bearer gb75QQW9Kkn092sDTmfRMyBLlufdfty1oIl9G4O2U0JjPTsBlVxIi4lmNCfb');
    // console.log(this.headers,'qweqwe');
    // {
    //   headers: {'Authorization':'Bearer S7XXtbsuFfEmwZt3bzWEqr3Td3LvCbclgfjYljMkcjq1LTxktQ7fblAOWwly'}}
    this.getAuthkey();

    let promise = new Promise((resolve, reject) => {
      this.http.post(url, data, this.options)
        .subscribe(
          response => {
            // console.log(response);
            resolve(response);

          },
          err => {
            // console.log(err);
            reject(err);
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

}
