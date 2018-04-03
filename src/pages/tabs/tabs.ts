import {Component} from '@angular/core';

import {ProfilePage} from '../profile/profile';
import {InfoPage} from '../info/info';
import {HomePage} from '../home/home';
import {FriendsPage} from "../friends/friends";
import {CommunicationProvider} from "../../providers/communication/communication ";
import {App, Tabs} from "ionic-angular";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = InfoPage;
  tab4Root = FriendsPage;
  communication;

  constructor(private comm: CommunicationProvider) {
    this.communication = this.comm.getDisplaySettings();
  }

  footerControll() {
    this.comm.tabsControllPressed();
  }
}
