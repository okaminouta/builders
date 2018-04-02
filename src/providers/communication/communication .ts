/*
  Generated class for the ComunicationcomunicationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()

export class CommunicationProvider {
  data = {
    jobsSelector: false
  };
  @Output() tabsControll = new EventEmitter<void>();

  getDisplaySettings() {
    return this.data;
  }

  switchJobsSelectorDisplay() {
    this.data.jobsSelector = !this.data.jobsSelector;
  }

  tabsControllPressed() {
    console.log('controll button presd');
    this.tabsControll.emit();
  }

  constructor() {
  }

}
