import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {SliderPage} from "../slider/slider";
import {ContentProvider} from "../../providers/content/content";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sentence: string = 'all';
  showSearchbar: boolean = false;
  jobsArr = [];
  myJobsArr = [];
  scrollLimit = 2;

  constructor(public navCtrl: NavController,
              public content: ContentProvider,
              public user: UserProvider,
              public events: Events) {
    events.subscribe('ionCancel', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome');
    });
    this.loadJobs();
  }

  loadJobs() {
    this.content.getJobs().then(res => {
      if (res) {
        console.log('jobs', res)
        this.jobsArr = res;
      }
    })
  }

  getMyJobs() {
    console.log('my jobs');
    this.user.myJobs().then((res) => {
      this.myJobsArr = res;
    })
  }

  toMyJobs(job) {
    this.user.applyForJob(job.id);
  }

  escapeJob (job) {
    console.log(this.myJobsArr.indexOf(job),'job')
    this.myJobsArr.splice(this.myJobsArr.indexOf(job), 1);
    this.user.escapeJob(job.id);
  }

  hideSBar() {
    this.showSearchbar = false;
  }

  showSBar() {
    this.showSearchbar = true;
  }

  showDetails(job) {
    job.details = !job.details;
    if (!job.viewed) {
      job.viewed = true;
      job.count++;
      this.content.counter(job.id);
    }

  }

  doInfinite(infiniteScroll) {
    if (this.scrollLimit < this.jobsArr.length) {
      this.scrollLimit += 5;
    }
  }
}
