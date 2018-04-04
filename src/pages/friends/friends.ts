import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {PhoneContactsPage} from "../phone-contacts/phone-contacts";
import {Contacts, Contact, ContactField, ContactName} from '@ionic-native/contacts';


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
  sentence: string = 'friends';
  friendsArr = [];
  private contactlist: any[];


  ngOnInit() {
    this.user.myFriends().then((res) => {
      if (res) {
        console.log(res, 'friends')
        this.friendsArr = res;
      }
    })
    this.contacts.find(["displayName", "phoneNumbers"], {multiple: true}).then((contacts) => {
      this.contactlist = contacts;
    });
  }

  toContacts() {
    this.navCtrl.push(PhoneContactsPage)
  }

  imageURI: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private contacts: Contacts,
              public user: UserProvider) {
    this.imageURI = 'assets/imgs/man.png';
    this.contacts.find(["displayName", "phoneNumbers"], {multiple: true}).then((contacts) => {
      alert(contacts)
      this.contactlist = contacts;
    });
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

}
