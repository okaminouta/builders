import {Component} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {NavController} from "ionic-angular";
import {ChangePassPage} from "../../pages/change-pass/change-pass";

@Component({
    selector: 'profile-about-me',
    templateUrl: 'profile-about-me.html'
})
export class ProfileAboutMeComponent {

    city: string;
    imageURI: any;
    imageFileName: any;

    showList: boolean = false;
    searchQuery: string = '';
    items: string[];

    constructor(public navCtrl: NavController,
                private camera: Camera) {
        this.initializeItems();
        this.imageURI = 'assets/imgs/camera.png';
    }

    getImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };

        this.camera.getPicture(options).then((imageData) => {
            this.imageURI = imageData;
        }, (err) => {
            console.log(err);
            // this.presentToast(err);
        });
    }

    presentContactModal() {
        this.navCtrl.push(ChangePassPage);

    }

    initializeItems() {
        this.items = [
            'Amsterdam',
            'Berlin',
            'Bueno Aires',
            'Madrid',
            'Paris'
        ];
    }

    chooseItem(item) {
        this.city = item;
        this.showList = false;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {

            // Filter the items
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });

            // Show the results
            this.showList = true;
        } else {

            // hide the results when the query is empty
            this.showList = false;
        }
    }


}
