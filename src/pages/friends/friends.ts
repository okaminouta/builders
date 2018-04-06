import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {PhoneContactsPage} from "../phone-contacts/phone-contacts";


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

  }

  toContacts() {
    this.navCtrl.push(PhoneContactsPage)
  }

  imageURI: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: UserProvider) {
    this.imageURI = 'assets/imgs/man.png';
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

  declineFriend (user) {
    this.user.friendRequestsDecline(user.id).then((res)=> {
      if (res) {
        this.friendRequestsArr.splice (this.friendRequestsArr.indexOf(user), 1)
      }
    })
  }

  acceptFriend (user) {
    this.user.friendRequestsAccept(user.id).then((res)=> {
      if (res) {
        this.friendRequestsArr.splice(this.friendRequestsArr.indexOf(user), 1);
        this.friendsArr.push(user);
      }
    })
  }


}
