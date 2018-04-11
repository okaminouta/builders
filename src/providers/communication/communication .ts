
import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()

export class CommunicationProvider {
  public friendRequest;
  public myFriend;
  data = {
    jobsSelector: false,
    editProfile: false
  };
  @Output() tabsControll = new EventEmitter<void>();
  @Output() profileEdit = new EventEmitter<boolean>();

  getDisplaySettings() {
    return this.data;
  }

  getFriendRequest(data){
    this.friendRequest = data;
  }
  getMyFriend(data){
    this.myFriend = data;
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
