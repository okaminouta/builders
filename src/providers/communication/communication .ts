
import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()

export class CommunicationProvider {
  data = {
    jobsSelector: false,
    editProfile: false,
  };
  emitValue: string;

  adviceJobsequence = {
    recipient_id: null,
    job_id: null
  }


  @Output() tabsControll = new EventEmitter<string>();
  @Output() profileEdit = new EventEmitter<boolean>();

  getDisplaySettings() {
    return this.data;
  }

  switchJobsSelectorDisplay() {
    this.data.jobsSelector = !this.data.jobsSelector;
  }

  tabsControllPressed() {
    console.log('controll button presd');
    this.tabsControll.emit(this.emitValue);
  }

  changeProfileEdit(val) {
    this.profileEdit.emit(val);
  }

  constructor() {
  }

}
