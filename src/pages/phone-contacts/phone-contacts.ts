import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Contacts, Contact, ContactField, ContactName} from '@ionic-native/contacts';
import {UserProvider} from "../../providers/user/user";

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
  private contactlist: any;
  displayContactlist;

    test(){
    this.displayContactlist =  this.contactlist;
    }

    showSearchbar: boolean = false;
friends;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: UserProvider,
              public alertCtrl: AlertController,
              private contacts: Contacts) {
  }

  ngOnInit() {
    this.contacts.find(["displayName", "phoneNumbers"], {
      multiple: true,
      hasPhoneNumber: true
    }).then((contacts) => {
      this.contactlist = contacts;
    });
    this.user.myFriends().then ((res)=> {
      this.friends = res;
      if(this.contactlist && this.contactlist.length > 0 && this.friends.length >0 ){
        this.compareNumbers();
      }
    })
  }


  compareNumbers () {
    this.contactlist.forEach((item)=>{
      if(this.friends.find((el)=> {return el.phone === item.phoneNumbers[0].value;})){
        item.added = true;
      }
    })

  }

  getContacts (){
    this.contacts.find(["displayName", "phoneNumbers"], {
      multiple: true,
      hasPhoneNumber: true
    }).then((contacts) => {
      this.contactlist = contacts;
      this.test();
    });
  }

numbers
  phoneSelectPopup(contact) {
    let alertPopup = this.alertCtrl.create();
    alertPopup.setTitle('Виберіть номер для відправки запрошення');
    alertPopup.addButton('Cancel');
    if(contact.phoneNumbers.length > 1) {
      for (let i = 0; i < contact.phoneNumbers.length; i++) {
        alertPopup.addInput({
          type: 'checkbox',
          label: contact.phoneNumbers[i].value,
          value: contact.phoneNumbers[i].value,
        })
    }
      alertPopup.addButton({
        text: 'Okay',
        handler: (data: any) => {
          this.user.friendRequestSend(data);
          contact.added = true;
        }
      });
      alertPopup.present();
    } else {
      this.user.friendRequestSend([contact.phoneNumbers[0].value]);
      contact.added = true;
    }

  }
    goBack() {
        this.navCtrl.pop();
    }
    hideSBar() {
      this.test();
        this.showSearchbar = false;
    }

    showSBar() {
        this.showSearchbar = true;
    }

  filterItems(ev: any) {
    // this.getContacts();
    this.test();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.displayContactlist = this.displayContactlist.filter(function(item) {
        return item.displayName.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  test1 () {
    // alert(this.test)
  }

//   fetchDeviceContact(){
//     let options = {
//       filter : "",
//       multiple:true,
//       hasPhoneNumber:true
//     };
//
//     this.contacts.find(["*"],options).then((contacts) => {
// alert(JSON.stringify(contacts));
// this.test = contacts
//
//       for (let i = 0; i < contacts.length; i++) {
//         let contact = contacts[i];
//         let no =contacts[i].name.formatted;
//         let phonenumber=contacts[i].phoneNumbers;
//         if(phonenumber != null) {
//           for(let n=0;n<phonenumber.length;n++) {
//             let type=phonenumber[n].type;
//             if(type=='mobile') {
//               let phone=phonenumber[n].value;
//               let mobile;
//               if(phone.slice(0,1)=='+' || phone.slice(0,1)=='0'){
//                 mobile=phone.replace(/[^a-zA-Z0-9+]/g, "");
//               }
//               else {
//                 let mobile_no=phone.replace(/[^a-zA-Z0-9]/g, "");
//                 mobile=mobile_no;
//               }
//
//               let contactData={
//                 "displayName":no,
//                 "phoneNumbers":mobile,
//               }
//               this.contactlist.push(contactData);
//             }
//           }
//         }
//       }
//
//       console.log("contactlist >>>",this.contactlist);
//
//     }).catch((err) => {
//       console.log('err',err);
//     });
//
//   }


}
