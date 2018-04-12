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
  profile: string = this.url + 'my_profile';
  setProfile: string = this.url + 'update_me';
  jobs: string = this.url + 'jobs';
  counter: string = this.url + 'see_job/';
  addSkills: string = this.url + 'addskill';
  deleteSkills: string = this.url + 'deleteskill';
  mySkills: string = this.url + 'myskill';
  updateSkill: string = this.url + 'updatelevel/';
  profileCreate: string = this.url + 'about_me';
  changePass: string = this.url + 'reset_password';
  myjobs: string = this.url + 'myjobs';
  applyForJob: string = this.url + 'addorder';
  escapeJob: string = this.url + 'deleteorder/';
  friendsAll = this.url + 'friend'
  friends = {
    requests: this.friendsAll + '/incoming',
    action: this.friendsAll + '/',
    accept: '/accept',
    decline: '/deny',
    send: this.friendsAll + '/send',
}
  jobSuggestions: string = this.url + 'orderjobs';
  suggestJobs: string = this.url + 'share';

  constructor(public http: HttpClient) {
    console.log('Hello UrlProvider Provider');
  }

}
