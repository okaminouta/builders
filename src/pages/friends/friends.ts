import {Component, OnInit} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {PhoneContactsPage} from "../phone-contacts/phone-contacts";
import {CommunicationProvider} from "../../providers/communication/communication ";

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage implements OnInit {
  showSearchbar: boolean = false;
  friendsArr = [];
  checked = false;
  friendRequestsArr = [];
  selectFriends = false;
  changesFriends = false;
  deleteFriends = false;

  ngOnInit() {
    this.friendsArr = this.comm.myFriend;
    this.friendRequestsArr = this.comm.friendRequest;
    this.comm.tabsControll.subscribe((str) => {
      if (str === 'adviceJob1') {
        this.comm.emitValue = 'adviceJob2';
        let arr = []
        this.friendsArr.forEach((item) => {
          if (item.checked) {
            arr.push(item.id)
          }

        })
        this.comm.adviceJobsequence.recipient_id = arr;
        this.tabs.select(0);
      }
      if (str === 'adviceJobFinish') {
        this.comm.data.jobsSelector = false;
        this.cancelFriendsSelection();
      }
    })

  }

  changesFriendsList() {
    this.changesFriends = true;
  }

  checkFriend(friend) {
    let count = 0;
    friend.checked = !friend.checked;
    this.friendsArr.forEach(function (key) {
      count += key.checked ? 1 : 0;
      return count
    });
    count >= 1 ? this.comm.data.deleteFriends = true : this.comm.data.deleteFriends = false;
    console.log(friend)
  }

  checkAllFriends() {
    this.friendsArr.forEach(item => item.checked = true)
    this.comm.data.deleteFriends = true
    console.log(this.friendsArr)
  }

  cancelFriendsChecked(){
    this.friendsArr.forEach(item => item.checked = false)
    this.comm.data.deleteFriends = false;
    this.changesFriends = false;
    console.log(this.friendsArr)
  }

  cancelFriendsSelection() {
    this.selectFriends = false;
    this.comm.data.jobsSelector = false;
    this.friendsArr.forEach((item) => item.checked = false)
  }

  adviceJob() {
    this.selectFriends = true;
    this.comm.emitValue = 'adviceJob1';
    this.comm.data.jobsSelector = true;
  }

  toContacts() {
    this.navCtrl.push(PhoneContactsPage)
  }

  // imageURI: any;
  tabs;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private app: App,
              public comm: CommunicationProvider,
              public user: UserProvider,
              public alertCtrl: AlertController) {
    // this.imageURI = 'assets/imgs/man.png';
    this.tabs = this.app.getNavByIdOrName('myTabsNav') as Tabs;
  }


  hideSBar() {
    this.showSearchbar = false;
  }

  showSBar() {
    this.showSearchbar = true;
  }

  declineFriend(user) {
    this.user.friendRequestsDecline(user.id).then((res) => {
      if (res) {
        this.friendRequestsArr.splice(this.friendRequestsArr.indexOf(user), 1)
      }
    })
  }

  acceptFriend(user) {
    this.user.friendRequestsAccept(user.id).then((res) => {
      if (res) {
        this.friendRequestsArr.splice(this.friendRequestsArr.indexOf(user), 1);
        this.friendsArr.push(user);
      }
    })
  }
}
