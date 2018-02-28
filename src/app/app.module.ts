import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from '@angular/common/http';


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
import {HelpPage} from "../pages/help/help";
import { UserProvider } from '../providers/user/user';
import { UrlProvider } from '../providers/url/url';
import { RequestProvider } from '../providers/request/request';



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
    HelpPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,

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
    HelpPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    UrlProvider,
    HttpClient,
    RequestProvider
  ],
})
export class AppModule {}
