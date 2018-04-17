import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UrlProvider} from "../url/url";
import {UserProvider} from "../user/user";
import {CommunicationProvider} from "../communication/communication ";
import {RequestProvider} from "../request.service";
import {tap} from "rxjs/operators";
import {UtilityProvider} from "../utility/utility";

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
              public util: UtilityProvider,
              public request: RequestProvider) {
    console.log('Hello ContentProvider Provider');
  }

  getSkills() {
    return this.request.get(this.url.getSkills).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }

  getJobs() {
    return this.request.get(this.url.jobs).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }

  getSuggestedJobs() {
    return this.request.get(this.url.jobSuggestions).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }

  suggestJobs() {
    return this.request.post(this.url.suggestJobs, this.comm.adviceJobsequence ).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }

  counter(id) {
    return this.request.get(this.url.counter + id).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    );
  }

}
