import {Component, OnInit} from '@angular/core';
import {UserProvider} from "../../providers/user/user"
import {ProfilePage} from '../profile/profile';
import {InfoPage} from '../info/info';
import {HomePage} from '../home/home';
import {FriendsPage} from "../friends/friends";
import {CommunicationProvider} from "../../providers/communication/communication ";
import {Keyboard} from "@ionic-native/keyboard";


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
  showTabs;

  constructor(private comm: CommunicationProvider,
              Keyboard:Keyboard,
              private user: UserProvider,) {
    this.communication = this.comm.getDisplaySettings();
    //todo remake when keyboard plugin begins to work properly
    window.addEventListener('keyboardDidShow', (ev) => {
      let elements = document.querySelectorAll(".tabbar");
      let content = document.querySelectorAll(".fixed-content");
      if (elements != null) {
        Object.keys(elements).map((key) => {
          elements[key].style.display = 'none';
        });
        Object.keys(content).map((key) => {
          content[key].style.margin = '0';
        });
      }
    });
    window.addEventListener('keyboardDidHide', () => {
      let elements = document.querySelectorAll(".tabbar");
      let content = document.querySelectorAll(".fixed-content");
      if (elements != null) {
        Object.keys(elements).map((key) => {
          elements[key].style.display = 'flex';
        });
        Object.keys(content).map((key) => {
          content[key].style.marginBottom = '56px';
        });
      }
    });

  }

  footerControll() {
    this.comm.tabsControllPressed();
  }


  ngOnInit() {
    this.user.myFriends().subscribe((res) => {
      if (res) {
        console.log(res, 'friends')
        // this.friendsArr = res;
        this.comm.getMyFriend(res);
      }
    })
    this.user.friendRequests().subscribe((res) => {
      if (res) {
        console.log(res, 'friends requests')
        // this.friendRequestsArr = res;
        this.comm.getFriendRequest(res);
        this.friendRequest = this.comm.friendRequest;
      }
    })

  }
}
