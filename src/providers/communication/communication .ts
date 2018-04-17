import {EventEmitter, Injectable, Output} from "@angular/core";
import {AlertController} from "ionic-angular";
import {UserProvider} from "../user/user";

@Injectable()

export class CommunicationProvider {
  public friendRequest;
  public myFriend;
  data = {
    jobsSelector: false,
    editProfile: false,
    deleteFriends: false,
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
    this.data.jobsSelector = !this.data.jobsSelector;
  }


  tabsControllPressed() {
    console.log('controll button presd');
    this.tabsControll.emit(this.emitValue);
  }

  changeProfileEdit(val) {
    this.profileEdit.emit(val);
  }

  constructor(private alertCtrl: AlertController,
              private user: UserProvider) {
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Видалити з контактів?',
      buttons: [
        {
          text: 'Ні',
          handler: () => {
            console.log('Не треба');
          }
        },
        {
          text: 'Так',
          handler: () => {
            let deleteMyFriend = [];
            this.myFriend.map(item => item.checked === true ? deleteMyFriend.push(item.id) : item)
            this.user.deleteMyFriends(deleteMyFriend)
          }
        }
      ]
    });
    confirm.present();
  }
}
