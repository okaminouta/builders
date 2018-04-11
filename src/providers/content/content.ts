import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UrlProvider} from "../url/url";
import {RequestProvider} from "../request/request";
import {UserProvider} from "../user/user";
import {CommunicationProvider} from "../communication/communication ";

/*
  Generated class for the ContentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContentProvider {


  constructor(public http: HttpClient,
              public url: UrlProvider,
              public comm: CommunicationProvider,
              public user: UserProvider,
              public request: RequestProvider) {
    console.log('Hello ContentProvider Provider');
  }

  getSkills() {
    return this.request.get(this.url.getSkills).then((res: any) => {
      if (res) {
        return res;
      }
    });
  }

  getJobs() {
    return this.request.get(this.url.jobs).then((res: any) => {
      if (res) {
        return res;
      }
    });
  }

  getSuggestedJobs() {
    return this.request.get(this.url.jobSuggestions).then((res: any) => {
      if (res) {
        return res;
      }
    });
  }

  suggestJobs() {
    return this.request.post(this.url.suggestJobs, this.comm.adviceJobsequence ).then((res: any) => {
     console.log(res,'suggest jobs res')
    });
  }

  counter(id) {
    return this.request.get(this.url.counter + id);
  }

}
