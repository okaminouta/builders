import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UrlProvider} from "../url/url";
import {RequestProvider} from "../request/request";

/*
  Generated class for the ContentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContentProvider {

  constructor(public http: HttpClient,
              public url: UrlProvider,
              public request: RequestProvider) {
    console.log('Hello ContentProvider Provider');
  }

  getSkills () {
      return this.request.get(this.url.getSkills).then((res: any) => {
        if (res) {
          return res;
        }
      });
  }

  getJobs () {
    return this.request.get(this.url.jobs).then((res: any) => {
      if (res) {
        return res;
      }
    });
  }

}
