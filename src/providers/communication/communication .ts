import {EventEmitter, Injectable, Output} from "@angular/core";
import {AlertController} from "ionic-angular";
import {UserProvider} from "../user/user";
import {FriendsPage} from "../../pages/friends/friends";

@Injectable()

export class CommunicationProvider {
  public friendRequest;
  public myFriend;
  emitValue: string;

  constructor(private alertCtrl: AlertController,
              private user: UserProvider) {
  }

  data = {
    tabsControllButton: false,
    editProfile: false,
    deleteFriends: false,
  };
  adviceJobsequence = {
    recipient_id: null,
    job_id: null
  };

  @Output() changeTabs = new EventEmitter<string>();
  @Output() quitEditing = new EventEmitter<boolean>();
  @Output() userSkills = new EventEmitter<void>();
  @Output() tabsControll = new EventEmitter<string>();
  @Output() profileEdit = new EventEmitter<boolean>();


  changeTab(str) {
    this.changeTabs.emit(str);
  }

  updateUserSkills() {
    this.userSkills.emit();
  }

  quitEdit(val) {
    this.quitEditing.emit(val);
  }

  getDisplaySettings() {
    return this.data;
  }

  getFriendRequest(data) {
    this.friendRequest = data;
  }

  getMyFriend(data) {
    this.myFriend = data;
  }

  switchJobsSelectorDisplay() {
    this.data.tabsControllButton = !this.data.tabsControllButton;
  }


  tabsControllPressed() {
    this.tabsControll.emit(this.emitValue);
  }

  changeProfileEdit(val) {
    this.profileEdit.emit(val);
  }

  showConfirmPopUp() {
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
            this.myFriend.filter(item => {
              if (item.checked) deleteMyFriend.push(item.id);
            });
            this.user.deleteMyFriends(deleteMyFriend).subscribe((res) => {
              if (res) {
                this.myFriend.forEach((item, index) => {
                  item.checked ? delete this.myFriend[index] : index
                })
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
