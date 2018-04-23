import {EventEmitter, Injectable, Output} from "@angular/core";
import {AlertController} from "ionic-angular";
import {UserProvider} from "../user/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class CommunicationProvider {
  public friendRequest;
  friends = new BehaviorSubject(null);
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
    return this.friends.next(data);
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
            const deleteMyFriend = this.friends.value.filter(e => e.checked).map(e => e.id);
            this.user.deleteMyFriends(deleteMyFriend).subscribe(() => {
              this.friends.next(this.friends.value.filter(e => !e.checked));
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
