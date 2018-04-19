import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {AddSkillModalsPage} from "../add-skill-modals/add-skill-modals";
import {ContentProvider} from "../../providers/content/content";
import {UserProvider} from "../../providers/user/user";
import {SliderPage} from "../slider/slider";
import {UtilityProvider} from "../../providers/utility/utility";
import {TabsPage} from "../tabs/tabs";
import {CommunicationProvider} from "../../providers/communication/communication ";

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
  unfinioshedReg = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public util: UtilityProvider,
                public user: UserProvider,
                public comm: CommunicationProvider,
                public alertCtrl: AlertController,
                public contentProvider: ContentProvider,
                public modalCtrl: ModalController) {
      this.contentProvider.getSkills().subscribe((res:any[]) => {
        console.log(res, 'res skills');
        this.skillsArr=res;
      })

      this.user.firstEnter().get().then((data)=>{
        if (data && data === 'Unfinished'){
          this.unfinioshedReg = true;
        }
      })
    }


    goBack() {
        this.navCtrl.pop();
    }

    skillSelectorPopap(skill:any) {
      console.log(skill,'23423423423')
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
            skill_id: item.id,
            level: item.lvl
          });
        }
      });
      console.log(idsArr);
      this.user.addSkills(idsArr).subscribe( (res) => {
        this.comm.updateUserSkills();
        if (this.unfinioshedReg) {
          this.user.firstEnter().setFalse();
          this.navCtrl.push(TabsPage);
        } else {
          this.goBack();
        }

        // if (res) {
        //   this.goBack();
        // }
      })
    }
}
