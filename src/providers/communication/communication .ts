
import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()

export class CommunicationProvider {
  data = {
    jobsSelector: false,
    editProfile: false
  };
  @Output() tabsControll = new EventEmitter<void>();
  @Output() profileEdit = new EventEmitter<boolean>();

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

  changeProfileEdit(val) {
    this.profileEdit.emit(val);
  }

  constructor() {
  }

}
