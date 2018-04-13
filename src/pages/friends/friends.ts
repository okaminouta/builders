import {Component, OnInit} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {PhoneContactsPage} from "../phone-contacts/phone-contacts";
import {CommunicationProvider} from "../../providers/communication/communication ";
import {ContentProvider} from "../../providers/content/content";


/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage implements OnInit {
  showSearchbar: boolean = false;
  friendsArr = [];
  friendRequestsArr = [];
  selectFriends = false;


  ngOnInit() {
    this.friendsArr = this.comm.myFriend;
    this.friendRequestsArr = this.comm.friendRequest;
    this.comm.tabsControll.subscribe((str) => {
      if (str === 'adviceJob1') {
        this.comm.emitValue = 'adviceJob2';
        this.comm.adviceJobsequence.recipient_id = this.getSelectedFriends ();
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
        this.comm.adviceJobsequence.recipient_id = this.getSelectedFriends ();
        this.content.suggestJobs();
        this.cancelFriendsSelection();
        this.tabs.select(0);
      }
    })

  }

  getSelectedFriends () {
    let arr = [];
    this.friendsArr.forEach((item) => {
      if (item.checked) {
        arr.push(item.id)
      }
    });
    return arr;
  }

  checkFriend(friend) {
    friend.checked = friend.checked ? false : true;
    console.log(friend)
  }

  checkAllFriends () {
    this.friendsArr.forEach((item) => item.checked = true)
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

  toContacts() {
    this.navCtrl.push(PhoneContactsPage)
  }

  // imageURI: any;
  tabs;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: UserProvider,
              public content: ContentProvider,
              private app: App,
              public comm: CommunicationProvider) {
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
