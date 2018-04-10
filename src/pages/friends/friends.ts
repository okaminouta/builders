import {Component, OnInit} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {PhoneContactsPage} from "../phone-contacts/phone-contacts";
import {CommunicationProvider} from "../../providers/communication/communication ";


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
    this.user.myFriends().then((res) => {
      if (res) {
        console.log(res, 'friends')
        this.friendsArr = res;
      }
    })
    this.user.friendRequests().then((res) => {
      if (res) {
        console.log(res, 'friends requests')
        this.friendRequestsArr = res;
      }
    })
    this.comm.tabsControll.subscribe((str) => {
      if (str === 'adviceJob1') {
        this.comm.emitValue = 'adviceJob2';
        let arr = []
        this.friendsArr.forEach((item) => {
          if (item.checked) {
            arr.push(item)
          }

        })
        this.comm.adviceJobsequence.friends = arr;
        this.tabs.select(0);
      }
      if (str === 'adviceJobFinish') {
        this.comm.data.jobsSelector = false;
        this.cancelFriendsSelection();
      }
    })

  }

  checkFriend(friend) {
    friend.checked = (friend.checked ? false : true);
    console.log(friend)
    // if(!friend.checked) friend.checked = true;
    // else friend.checked = false;
  }

  cancelFriendsSelection() {
    this.selectFriends = false;
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
              public user: UserProvider) {
    // this.imageURI = 'assets/imgs/man.png';
    this.tabs = this.app.getNavByIdOrName('myTabsNav') as Tabs;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
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
