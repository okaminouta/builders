import {EventEmitter, Injectable, Output} from '@angular/core';
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
              public storage: Storage) {
    console.log('Hello UserProvider Provider');
  }
  @Output() dataChange = new EventEmitter<boolean>();
  register(data: any) {
    return this.request.post(this.url.signUp, data).then((res: any) => {
      if (res) {
        this.setUser(res.data);
        return res;
      }
    });

  }

  login(data: any) {
    return this.request.post(this.url.signIn, data).then((res: any) => {
      if (res) {
        this.setUser(res.data);
        return res;
      }
    });

  }

  logout() {
    return this.storage.remove('user').then(() => {
      return this.request.post(this.url.logOut, {});
    })
  }

  setUser(data) {
    this.storage.set('user', data);

  }

  getUser() {
    return this.storage.get('user').then((data) => {
      return data;
    });
  }

  contacktSupport(data) {
    return this.request.post(this.url.support, data);
  }
    changePass(data) {
        return this.request.post(this.url.changePass, data);
    }

  firstEnter() {
    return {
      setTrue: () => {
        this.storage.set('firstEnter', true);
      },
      setFalse: () => {
        this.storage.set('firstEnter', false);
        this.dataChange.emit(false);
      },
      get: () => {
        return this.storage.get('firstEnter').then((data) => {
          return data;
        });
      }
    }
  }

  getProfile(data) {
    //todo remake this funk
    return this.request.post('http://hire-man.grassbusinesslabs.tk/public/api/base64', data).then((res: any) => {
      if (res) {
        console.log(res,'setProfile res')
      }
    });


  }

  setProfile(data: any) {
    return this.request.post(this.url.profileCreate, data).then((res: any) => {
      if (res) {
        console.log(res,'setProfile res')
      }
    });
  }
}
