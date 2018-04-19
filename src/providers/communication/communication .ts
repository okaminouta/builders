import {EventEmitter, Injectable, Output} from "@angular/core";
import {AlertController} from "ionic-angular";
import {UserProvider} from "../user/user";

@Injectable()

export class CommunicationProvider {
  public friendRequest;
  public myFriend;

  data = {
    tabsControllButton: false,
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
    console.log('controll button presd');
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
              if (item.checked) {
                deleteMyFriend.push(item.id)
              }
            })
            this.user.deleteMyFriends(deleteMyFriend).subscribe((res) => {
              // for (let i = 0; i < this.myFriend.length; i++) {
              //   this.myFriend[i].checked ? this.myFriend.splice(i, 1) : this.myFriend[i];
              // }
              if (res) {
                this.myFriend.forEach((item, index) => {
                  item.checked ? this.myFriend.splice(index, 1) : index
                })
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }

  constructor(private alertCtrl: AlertController,
              private user: UserProvider) {
  }

}
