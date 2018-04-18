import {Component} from '@angular/core';
import {App, Events, NavController, Tabs} from 'ionic-angular';
import {ContentProvider} from "../../providers/content/content";
import {UserProvider} from "../../providers/user/user";
import {CommunicationProvider} from "../../providers/communication/communication ";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sentence: string = 'all';
  showSearchbar: boolean = false;
  jobsArr = [];
  myJobsArr = [];
  suggestedJobs = [];
  scrollLimit = 2;
  communication;
  tabs;

  constructor(public navCtrl: NavController,
              public content: ContentProvider,
              public user: UserProvider,
              private app: App,
              private comm: CommunicationProvider,
              public events: Events) {

    this.tabs = this.app.getNavByIdOrName('myTabsNav') as Tabs;
    this.comm.tabsControll.subscribe((str) => {
      console.log('home lisner', str)
    })
    this.loadJobs();
    this.communication = this.comm.getDisplaySettings()
    this.comm.tabsControll.subscribe((str) => {
      if (str === 'adviceJob2') {
        this.comm.emitValue = 'adviceJobFinish';
        this.comm.adviceJobsequence.job_id = this.getCheckedElements();
        console.log(this.comm.adviceJobsequence, 'request advice job data')
        this.content.suggestJobs().subscribe((res) => {
          this.comm.tabsControllPressed();
          this.tabs.select(1);

        })

      }
    })
    this.content.getSuggestedJobs().subscribe((res: any[]) => {
      this.suggestedJobs = (res ? res : []);
      console.log(res, 'suggested jobs')
    })
  }

  getCheckedElements() {
    let arr = [];
    this.jobsArr.forEach((item) => {
      if (item.checked) {
        arr.push(item.id);
        item.checked = false;
      }
    });
    this.myJobsArr.forEach((item) => {
      if (item.checked) {
        arr.push(item.id);
        item.checked = false;
      }
    });
    this.suggestedJobs.forEach((item) => {
      if (item.job.checked) {
        arr.push(item.job.id);
        item.job.checked = false;
      }
    });
    return arr;
  }

  checkJob(job) {
    if (!job.checked) {
      job.checked = true;
    } else job.checked = false;
    console.log(job)
  }

  checkAll() {
    if (this.sentence === 'all') {
      this.jobsArr.forEach((job) => job.checked = true)
      this.suggestedJobs.forEach((item) => item.job.checked = true)
    } else {
      this.myJobsArr.forEach((job) => {
        job.checked = true;
      })
    }
  }

  switchJobsSelectorDisplay() {
    this.comm.switchJobsSelectorDisplay();
  }

  goToFriendsSelection() {
    this.comm.emitValue = 'adviceJob1';
    this.tabs.select(1);
  }

  loadJobs() {
    this.content.getJobs().subscribe((res:any[]) => {
      if (res) {
        console.log('jobs', res)
        this.jobsArr = res;
      }
    })
  }

  getMyJobs() {

    this.user.myJobs().subscribe((res:any[]) => {
      console.log('my jobs', res);
      this.myJobsArr = res;
    })
  }

  toMyJobs(job) {
    this.user.applyForJob(job.id).subscribe(()=>{
      if (this.jobsArr.indexOf(job) !== -1) {
        this.jobsArr.splice(this.jobsArr.indexOf(job), 1);
      } else this.suggestedJobs.splice(this.suggestedJobs.indexOf(job), 1);
    });

  }

  escapeJob(job) {
    console.log(this.myJobsArr.indexOf(job), 'job')
    this.user.escapeJob(job.id).subscribe(()=>{
      this.myJobsArr.splice(this.myJobsArr.indexOf(job), 1);
    })
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

  showMyJobDetails(job) {
    job.details = !job.details;
    if (!job.viewed) {
      job.viewed = true;
      job.count++;
      this.content.counter(job.job.id);
    }

  }

  doInfinite(infiniteScroll) {
    if (this.scrollLimit < this.jobsArr.length) {
      this.scrollLimit += 5;
    }
  }

  shareJob (job) {
    this.comm.adviceJobsequence.job_id = [job.id];
    this.comm.emitValue = 'selectFriends';
    this.comm.tabsControllPressed();
    this.tabs.select(1);
    this.comm.data.tabsControllButton = true;
  }
}
