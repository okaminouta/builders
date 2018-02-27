import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RequestProvider Provider');
  }

  get() {

  }

  post(url, data) {
    let promise = new Promise((resolve, reject) => {
      // const headers = new Headers({'Content-Type': '', 'Accept': 'application/json'});
      debugger
      this.http.post(url, data)
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
        return err;
      });
    ;
  }

  put() {

  }

  resolve(res: any) {

  }

  reject(res: any) {

  }

}
