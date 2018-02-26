import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/info/info';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {HeaderComponent} from "../components/header/header";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {Mask} from "../directives/mask/mask";
import {FriendsPage} from "../pages/friends/friends";
import {SliderPage} from "../pages/slider/slider";
import {AboutPage} from "../pages/about/about";

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    InfoPage,
    HomePage,
    TabsPage,
    LoginPage,
    HeaderComponent,
    SignUpPage,
    Mask,
    FriendsPage,
    SliderPage,
    AboutPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    InfoPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    FriendsPage,
    SliderPage,
    AboutPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
})
export class AppModule {}
