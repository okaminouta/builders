import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlProvider} from "../url/url";
import {HttpClientModule} from '@angular/common/http';
import {RequestProvider} from "../request/request";
import 'rxjs/add/operator/toPromise';
import {Storage} from "@ionic/storage";

import {TabsPage} from "../../pages/tabs/tabs";


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

    constructor(private http: HttpClient,
                private request: RequestProvider,
                private url: UrlProvider,
                private storage: Storage) {
        console.log('Hello UserProvider Provider');
    }

    register(data: any) {
        return this.request.post(this.url.signUp, data);

    }

    login(data: any) {
        return this.request.post(this.url.signIn, data).then((res: any) => {
          if (res) {
            this.setUser (res.data);
            return res;
          }
        });

    }

    logout() {
      return this.storage.clear().then(() => {
        return this.request.post(this.url.logOut,{});
      })
    }

    setUser (data) {
      this.storage.set('user', data);

    }

    getUser() {
      return this.storage.get('user').then((data) => {
        return  data;
      });
    }

    contacktSupport (data) {
      return this.request.post(this.url.support, data);
    }


}
