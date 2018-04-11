import {Component, OnInit} from '@angular/core';
import {UserProvider} from "../../providers/user/user"
import {ProfilePage} from '../profile/profile';
import {InfoPage} from '../info/info';
import {HomePage} from '../home/home';
import {FriendsPage} from "../friends/friends";
import {CommunicationProvider} from "../../providers/communication/communication ";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [UserProvider],
})
export class TabsPage implements OnInit {
  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = InfoPage;
  tab4Root = FriendsPage;
  communication;
  friendRequest = [];

  constructor(private comm: CommunicationProvider,
              private user: UserProvider,) {

    this.communication = this.comm.getDisplaySettings();

  }

  footerControll() {
    this.comm.tabsControllPressed();
  }


  ngOnInit() {
    this.user.myFriends().then((res) => {
      if (res) {
        console.log(res, 'friends')
        // this.friendsArr = res;
        this.comm.getMyFriend(res);
      }
    })
    this.user.friendRequests().then((res) => {
      if (res) {
        console.log(res, 'friends requests')
        // this.friendRequestsArr = res;
        this.comm.getFriendRequest(res);
        this.friendRequest = this.comm.friendRequest;
      }
    })

  }
}
