import { Component } from '@angular/core';

/**
 * Generated class for the ProfileAboutMeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-about-me',
  templateUrl: 'profile-about-me.html'
})
export class ProfileAboutMeComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileAboutMeComponent Component');
    this.text = 'Hello World';
  }

}
