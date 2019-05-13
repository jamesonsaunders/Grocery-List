import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'https://jamibot.com/tos',
  privacyPolicyUrl: 'https://jamibot.com/privacy',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
