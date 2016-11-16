import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { Login } from '../../providers/login';
import { IUser } from '../../shared';

let _crypto = require('crypto');

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Login]
})
export class LoginPage {

  username: string;
  password: string;
  user: IUser;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public login: Login
  ) { }

  ionViewDidLoad() {

  }

  goSetting() {
    this.navCtrl.push(SettingsPage);
  }

  doLogin() {
    let password = _crypto.createHash('md5').update(this.password).digest('hex');
    console.log(password);

    this.login.doLogin(this.username, password)
      .then((user: IUser) => {
        if (user) {
          console.log(user);
          localStorage.setItem('fullname', user.fullname);
          localStorage.setItem('user_type', user.user_type);
          this.navCtrl.setRoot(HomePage);
        } else {
          let alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด!',
            subTitle: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่',
            buttons: ['ตกลง']
          });
          alert.present();
        }
   
      }, err => {
        console.error(err);
        let alert = this.alertCtrl.create({
          title: 'เกิดข้อผิดพลาด!',
          subTitle: JSON.stringify(err),
          buttons: ['ตกลง']
        });
        alert.present();
      });
  }

}
