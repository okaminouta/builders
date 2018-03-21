import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UtilityProvider} from "../utility/utility";
import {UserProvider} from "../user/user";
import {Storage} from "@ionic/storage";
import {RequestOptions} from "@angular/http";

@Injectable()
export class RequestProvider {
  authKey: string;
  options: any;

  constructor(public http: HttpClient,
              private util: UtilityProvider,
              private storage: Storage) {
  }

  getAuthkey() {
    return this.storage.get('user').then((data) => {
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
    let promise = new Promise((resolve, reject) => {
      this.getAuthkey().then(() => {
        this.http.get(url, this.options)
          .subscribe(
            response => {
              resolve(response);

            },
            err => {
              alert(err.message);
              reject(err);
            });
      })
    });
    return promise.then(data => {
        console.log(data, 'data');
        return data
      },
      err => {
        alert(err.message);
      });
  }

  post(url, data) {
    let promise = new Promise((resolve, reject) => {
      this.getAuthkey().then(() => {
        console.log(this.options,'headers')
        this.http.post(url, data, this.options)
          .subscribe(
            response => {
              resolve(response);

            },
            err => {
              alert(err.message);
              reject(err);
            });
      })
    });
    return promise.then(data => {
        console.log(data, 'data');
        return data
      },
      err => {
        console.log(err, 'err');
      });
  }

  put() {

  }

}
