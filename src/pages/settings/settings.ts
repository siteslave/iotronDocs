import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ISetting } from '../../shared';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  hos: ISetting;
  idoc: ISetting;
  
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.hos = {
      host: null,
      port: null,
      database: null,
      user: null,
      password: null
    };

    this.idoc = {
      host: null,
      port: null,
      database: null,
      user: null,
      password: null
    };
  }

  ionViewDidLoad() {
    this.hos = {
      host: localStorage.getItem('HOS_HOST') ? localStorage.getItem('HOS_HOST') : 'localhost',
      port: +localStorage.getItem('HOS_PORT') ? +localStorage.getItem('HOS_PORT') : 3306,
      database: localStorage.getItem('HOS_DBNAME') ? localStorage.getItem('HOS_DBNAME') : 'hos',
      user: localStorage.getItem('HOS_USER') ? localStorage.getItem('HOS_USER') : 'sa',
      password: localStorage.getItem('HOS_PASSWORD') ? localStorage.getItem('HOS_PASSWORD') : 'sa'
    };

    this.idoc = {
      host: localStorage.getItem('DOC_HOST') ? localStorage.getItem('DOC_HOST') : 'localhost',
      port: +localStorage.getItem('DOC_PORT') ? +localStorage.getItem('DOC_PORT') : 3306,
      database: localStorage.getItem('DOC_DBNAME') ? localStorage.getItem('DOC_DBNAME') : 'idocs',
      user: localStorage.getItem('DOC_USER') ? localStorage.getItem('DOC_USER') : 'sa',
      password: localStorage.getItem('DOC_PASSWORD') ? localStorage.getItem('DOC_PASSWORD') : 'sa'
    };
  }

  goBack() {
    this.navCtrl.push(LoginPage);
  }

  save() {
    localStorage.setItem('HOS_HOST', this.hos.host);
    localStorage.setItem('HOS_PORT', '3306');
    localStorage.setItem('HOS_DBNAME', this.hos.database);
    localStorage.setItem('HOS_USER', this.hos.user);
    localStorage.setItem('HOS_PASSWORD', this.hos.password);

    localStorage.setItem('DOC_HOST', this.idoc.host);
    localStorage.setItem('DOC_PORT', '3306');
    localStorage.setItem('DOC_DBNAME', this.idoc.database);
    localStorage.setItem('DOC_USER', this.idoc.user);
    localStorage.setItem('DOC_PASSWORD', this.idoc.password);


    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'บันทึกข้อมูลเสร็จเรียบร้อยแล้ว',
      buttons: ['ตกลง']
    });

    alert.present();
    
  }

}
