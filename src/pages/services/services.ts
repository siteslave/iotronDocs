import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams } from 'ionic-angular';

import { UploaderPage } from '../uploader/uploader';
import { IPatient } from '../../shared';

@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage {
  patient: IPatient;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams
  ) { 
    this.patient = { cid: null, hn: null, fullname: null, address: null };
    console.log(this.navParams.data.patient);
    }

  ionViewDidLoad() {
    this.patient = this.navParams.data.patient;
  }

  showMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'เมนูใช้งาน',
      buttons: [
        {
          text: 'อัปโหลดเอกสาร',
          role: 'destructive',
          icon: 'cloud-upload',
          handler: () => {
            this.goUploader();
          }
        },{
          text: 'ดูประวัติรักษา',
          icon: 'search',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  };

  goUploader() {
    this.navCtrl.push(UploaderPage);
  }

}
