
import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()

export class CommunicationProvider {
  public friendRequest;
  public myFriend;
  data = {
    tabsControllButton: false,
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

  getFriendRequest(data){
    this.friendRequest = data;
  }
  getMyFriend(data){
    this.myFriend = data;
  }

  switchJobsSelectorDisplay() {
    this.data.tabsControllButton = !this.data.tabsControllButton;
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
