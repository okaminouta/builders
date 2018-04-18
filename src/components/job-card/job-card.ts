import {Component, Input, OnInit} from '@angular/core';
import {CommunicationProvider} from "../../providers/communication/communication ";
import {UserProvider} from "../../providers/user/user";
import {App, Tabs} from "ionic-angular";
import {ContentProvider} from "../../providers/content/content";

/**
 * Generated class for the JobCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'job-card',
  templateUrl: 'job-card.html'
})
export class JobCardComponent implements OnInit{
  @Input() job: any;
  @Input() jobsArr: any;
  communication;
  tabs;

  constructor(private comm: CommunicationProvider,
              public user: UserProvider,
              public content: ContentProvider,
              private app: App,) {
    this.communication = this.comm.getDisplaySettings()
  }

  ngOnInit () {
    this.tabs = this.app.getNavByIdOrName('myTabsNav') as Tabs;
  }

  checkJob(job) {
   job.checked = !job.checked;
    console.log(job)
  }


  escapeJob(job) {
    console.log(this.jobsArr.indexOf(job), 'job')
    this.user.escapeJob(job.id).subscribe(() => {
      this.jobsArr.splice(this.jobsArr.indexOf(job), 1);
    })
  }

  shareJob (job) {
    this.comm.adviceJobsequence.job_id = [job.id];
    this.comm.emitValue = 'selectFriends';
    this.comm.tabsControllPressed();
    this.tabs.select(1);
    this.comm.data.tabsControllButton = true;
  }

  showMyJobDetails(job) {
    job.details = !job.details;
    if (!job.viewed) {
      job.viewed = true;
      job.count++;
      this.content.counter(job.id);
    }

  }

  toMyJobs(job) {
    this.user.applyForJob(job.id).subscribe(()=>{
        this.jobsArr.splice(this.jobsArr.indexOf(job), 1);
    });
  }

}
