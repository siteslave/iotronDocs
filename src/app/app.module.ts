import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServicesPage } from '../pages/services/services';
import { UploaderPage } from '../pages/uploader/uploader';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';

import { Image } from '../providers/image';
import { Connection } from '../providers/connection';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServicesPage,
    UploaderPage,
    SettingsPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ServicesPage,
    UploaderPage,
    SettingsPage,
    LoginPage
  ],
  providers: [Image, Connection]
})
export class AppModule {}
