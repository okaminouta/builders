import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {AddSkillModalsPage} from "../add-skill-modals/add-skill-modals";
import {ContentProvider} from "../../providers/content/content";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the AddSkillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-skill',
    templateUrl: 'add-skill.html',
})
export class AddSkillPage {
  skillsArr=[];
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public user: UserProvider,
                public alertCtrl: AlertController,
                public contentProvider: ContentProvider,
                public modalCtrl: ModalController) {
      this.contentProvider.getSkills().then((res) => {
        console.log(res, 'res skills');
        this.skillsArr=res;
      })
    }

    // ionViewDidLoad() {
    //     console.log('ionViewDidLoad AddSkillPage');
    // }

    goBack() {
        this.navCtrl.pop();
    }

    skillSelectorPopap(skill:any) {
        let modal = this.modalCtrl.create(AddSkillModalsPage, {item: skill});
      modal.onDidDismiss(data => {
        console.log(data,'modal data');
        if(data){
          skill=data;
        }
      });
        modal.present()

    }

    save () {
      let idsArr = [];
      this.skillsArr.forEach( (item) => {
        if(item.checked){
          idsArr.push({
            id: item.id,
            level: item.level
          });
        }
      });
      console.log({skills:idsArr});
      this.user.addSkills({skills:idsArr});
    }
}
