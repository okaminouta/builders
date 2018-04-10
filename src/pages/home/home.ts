import {Component} from '@angular/core';
import {App, Events, NavController, Tabs} from 'ionic-angular';
import {SliderPage} from "../slider/slider";
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
    this.comm.tabsControll.subscribe((str)=>{
      console.log('home lisner', str)
    })
    this.loadJobs();
    this.communication = this.comm.getDisplaySettings()
    this.comm.tabsControll.subscribe((str)=>{
      if (str === 'adviceJob2') {
        this.comm.emitValue = 'adviceJobFinish';
        let arr =[]
        this.jobsArr.forEach((item)=> {
          if(item.checked)  {
            arr.push(item)
          }

        })
        this.myJobsArr.forEach((item)=> {
          if(item.checked)  {
            arr.push(item)
          }
        })
        this.comm.adviceJobsequence.jobs = arr;
        console.log(this.comm.adviceJobsequence,'request advice job data')
        this.comm.tabsControllPressed();
        this.tabs.select(1);
      }
    })
  }

  checkJob(job) {
    if(!job.checked){
      job.checked = true;
    } else job.checked = false;
    console.log(job)
  }

  checkAll (){
    if (this.sentence === 'all'){
       this.jobsArr.forEach( (job)=>{
         job.checked = true;
       })
    } else {
      this.myJobsArr.forEach( (job)=>{
        job.checked = true;
      })
    }
  }
  switchJobsSelectorDisplay () {
    this.comm.switchJobsSelectorDisplay();
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
    this.jobsArr.splice(this.jobsArr.indexOf(job), 1);
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
}
