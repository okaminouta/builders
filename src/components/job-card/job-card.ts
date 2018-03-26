import {Component, Input} from '@angular/core';

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
export class JobCardComponent {
@Input ()job:any;

  constructor() {

  }

  showDetails(job) {
    job.details = !job.details;
    if (!job.viewed) {
      job.viewed = true;
      job.count++;
    }

  }

}
