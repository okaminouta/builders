import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {UserProvider} from "../providers/user/user";
import {SliderPage} from "../pages/slider/slider";
import {TabsPage} from "../pages/tabs/tabs";
@Component({
    templateUrl: 'app.html',
    providers: [
        ScreenOrientation
    ]
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;
    rootPage: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                public  user: UserProvider,
                private screenOrientation: ScreenOrientation) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (platform.is('cordova')) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            statusBar.styleDefault();
            this.user.firstEnter().get().then((res)=> {
                if(!res){
                    this.user.firstEnter().setTrue();
                    this.navCtrl.setRoot(SliderPage)
                }
                if (res === 'Finished'){
                    this.user.getUser().then((res)=> {
                        if(res){
                            this.navCtrl.setRoot(TabsPage)
                        } else {
                            this.navCtrl.setRoot(LoginPage);
                        }
                    })
                }else {
                    this.navCtrl.setRoot(LoginPage);
                }
            });
            splashScreen.hide();
        });
    }


}
