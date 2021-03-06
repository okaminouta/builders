import {Component, OnInit} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {PhoneContactsPage} from "../phone-contacts/phone-contacts";
import {CommunicationProvider} from "../../providers/communication/communication ";
import {ContentProvider} from "../../providers/content/content";

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage implements OnInit {
  showSearchbar = false;
  friendsArr = [];
  checked = false;
  friendRequestsArr = [];
  selectFriends = false;
  changesFriends = false;
  deleteFriends = false;
  tabs: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: UserProvider,
              public content: ContentProvider,
              private app: App,
              public comm: CommunicationProvider,
              public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.tabs = this.app.getNavByIdOrName('myTabsNav') as Tabs;
    this.friendsArr = this.comm.myFriend;
    this.friendRequestsArr = this.comm.friendRequest;
    this.comm.tabsControll.subscribe((str) => {
      if (str === 'adviceJob1') {
        this.comm.emitValue = 'adviceJob2';
        this.comm.adviceJobsequence.recipient_id = this.getSelectedFriends();
        this.tabs.select(0);
      }
      if (str === 'adviceJobFinish') {
        this.cancelFriendsSelection();
      }
      if (str === 'selectFriends') {
        this.comm.emitValue = 'selectFriendsFinish';
        this.selectFriends = true;
      }
      if (str === 'selectFriendsFinish') {
        this.comm.adviceJobsequence.recipient_id = this.getSelectedFriends();
        this.content.suggestJobs();
        this.cancelFriendsSelection();
        this.tabs.select(0);
      }
    })
  }

  declineFriend(user) {
    this.user.friendRequestsDecline(user.id).subscribe((res) => {
      this.friendRequestsArr.splice(this.friendRequestsArr.indexOf(user), 1)
    })
  }

  acceptFriend(user) {
    this.user.friendRequestsAccept(user.id).subscribe((res) => {
      this.friendRequestsArr.splice(this.friendRequestsArr.indexOf(user), 1);
      this.friendsArr.push(user);
    })
  }

  getSelectedFriends() {
    let arr = [];
    this.friendsArr.forEach((item) => {
      if (item.checked) arr.push(item.id)
    });
    return arr;
  }

  checkFriend(friend) {
    let count = 0;
    friend.checked = !friend.checked;
    this.friendsArr.forEach(function (key) {
      count += key.checked ? 1 : 0;
      return count
    });
    if (count >= 1 && this.changesFriends == true) {
      this.comm.data.deleteFriends = true
    } else if (count >= 1 && this.selectFriends == true) {
      this.comm.data.tabsControllButton = true
    } else {
      this.comm.data.deleteFriends = false;
      this.comm.data.tabsControllButton = false;
    }
    console.log(this.friendsArr)
  }

  checkAllFriends() {
    this.friendsArr.forEach(item => item.checked = true);
    if (this.changesFriends) this.comm.data.deleteFriends = true;
    console.log(this.friendsArr)
  }

  cancelFriendsChecked() {
    this.friendsArr.forEach(item => item.checked = false);
    this.comm.data.deleteFriends = false;
    this.changesFriends = false;
  }

  cancelFriendsSelection() {
    this.selectFriends = false;
    this.comm.data.tabsControllButton = false;
    this.friendsArr.forEach((item) => item.checked = false)
  }

  adviceJob() {
    this.selectFriends = true;
    this.comm.emitValue = 'adviceJob1';
    this.comm.data.tabsControllButton = true;
  }

  changesFriendsList() {
    this.changesFriends = true;
  }

  toContacts() {
    this.navCtrl.push(PhoneContactsPage)
  }

  hideSBar() {
    this.showSearchbar = false;
  }

  showSBar() {
    this.showSearchbar = true;
  }
}
