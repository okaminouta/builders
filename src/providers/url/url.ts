import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {

  url: string = 'http://hire-man.grassbusinesslabs.tk/public/api/';
  signUp: string = this.url + 'register';
  signIn: string = this.url + 'login';
  logOut: string = this.url + 'logout';
  support: string = this.url + 'support';
  getSkills: string = this.url + 'skill';
  profileCreate: string = this.url + 'about_me';

  constructor(public http: HttpClient) {
    console.log('Hello UrlProvider Provider');
  }

}
