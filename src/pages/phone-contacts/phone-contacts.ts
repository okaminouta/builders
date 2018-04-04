import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/**
 * Generated class for the PhoneContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone-contacts',
  templateUrl: 'phone-contacts.html',
})
export class PhoneContactsPage implements OnInit {
  contactlist: any[];
  contactlist2: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private contacts: Contacts) {
  }

  ngOnInit() {
    this.contacts.find(["displayName", "phoneNumbers"], {multiple: true}).then((contacts) => {
      this.contactlist2 = contacts;
    });
    this.fetchDeviceContact();
  }

  fetchDeviceContact(){
    let options = {
      filter : "",
      multiple:true,
      hasPhoneNumber:true
    };

    this.contacts.find(["*"],options).then((contacts) => {
alert(JSON.stringify(contacts));

      for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let no =contacts[i].name.formatted;
        let phonenumber=contacts[i].phoneNumbers;
        if(phonenumber != null) {
          for(let n=0;n<phonenumber.length;n++) {
            let type=phonenumber[n].type;
            if(type=='mobile') {
              let phone=phonenumber[n].value;
              let mobile;
              if(phone.slice(0,1)=='+' || phone.slice(0,1)=='0'){
                mobile=phone.replace(/[^a-zA-Z0-9+]/g, "");
              }
              else {
                let mobile_no=phone.replace(/[^a-zA-Z0-9]/g, "");
                mobile=mobile_no;
              }

              let contactData={
                "displayName":no,
                "phoneNumbers":mobile,
              }
              this.contactlist.push(contactData);
            }
          }
        }
      }

      console.log("contactlist >>>",this.contactlist);

    }).catch((err) => {
      console.log('err',err);
    });

  }


}
