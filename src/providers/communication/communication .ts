import {EventEmitter, Injectable, Output} from "@angular/core";
import {AlertController} from "ionic-angular";
import {UserProvider} from "../user/user";
import {FriendsPage} from "../../pages/friends/friends";

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
            this.myFriend.forEach(item => {
              if(item.checked){
                deleteMyFriend.push(item.id)
              }
            })
            this.user.deleteMyFriends(deleteMyFriend).subscribe((res) => {
                if(res){
                  // this.myFriend.map(item => item.checked ? this.myFriend.splice() : item)
                  console.log(this.myFriend)
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
