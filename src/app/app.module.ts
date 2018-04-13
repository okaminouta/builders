import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {Camera} from '@ionic-native/camera';
import {FormsModule} from '@angular/forms';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { Contacts, Contact, } from '@ionic-native/contacts';

import {ProfilePage} from '../pages/profile/profile';
import {InfoPage} from '../pages/info/info';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {RecoverPassPage} from "../pages/recover-pass/recover-pass";
import {Mask} from "../directives/mask/mask";
import {FriendsPage} from "../pages/friends/friends";
import {SliderPage} from "../pages/slider/slider";
import {AboutPage} from "../pages/about/about";
import {HelpPage} from "../pages/help/help";
import {UserProvider} from '../providers/user/user';
import {UrlProvider} from '../providers/url/url';
import {RequestProvider} from '../providers/request/request';
import {UtilityProvider} from '../providers/utility/utility';
import {ChangePassPage} from "../pages/change-pass/change-pass";
import {AddSkillPage} from "../pages/add-skill/add-skill";
import {FaIconComponent} from "../components/fa-icon/fa-icon";
import {AddSkillModalsPage} from "../pages/add-skill-modals/add-skill-modals";
import {ProfileAboutMeComponent} from "../components/profile-about-me/profile-about-me";
import {ProfileSkilsComponent} from "../components/profile-skils/profile-skils";
import { ContentProvider } from '../providers/content/content';
import { MediaProvider } from '../providers/media/media';
import {CameraOptionsPage} from "../pages/camera-options/camera-options";
import {JobCardComponent} from "../components/job-card/job-card";
import {FocusDirective} from "../directives/focus/focus";
import { CommunicationProvider } from '../providers/communication/communication ';
import {PhoneContactsPage} from "../pages/phone-contacts/phone-contacts";
import {OrderPipe} from "../pipes/oreder-by/order-by";


@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    InfoPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    Mask,
    FocusDirective,
    FriendsPage,
    SliderPage,
    AboutPage,
    HelpPage,
    ChangePassPage,
    AddSkillPage,
    FaIconComponent,
    AddSkillModalsPage,
    ProfileAboutMeComponent,
    ProfileSkilsComponent,
    CameraOptionsPage,
    JobCardComponent,
    PhoneContactsPage,
      RecoverPassPage,
    OrderPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Go Back'
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrMaskerModule,

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
    ChangePassPage,
    AddSkillPage,
    FaIconComponent,
    AddSkillModalsPage,
    ProfileAboutMeComponent,
    ProfileSkilsComponent,
    CameraOptionsPage,
    JobCardComponent,
    PhoneContactsPage,
      RecoverPassPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    Crop,
    Base64,
    UserProvider,
    UrlProvider,
    HttpClient,
    RequestProvider,
    UtilityProvider,
    ContentProvider,
    MediaProvider,
    Contacts,
    Contact,
    CommunicationProvider,
    OrderPipe,
  ],
})
export class AppModule {
}
