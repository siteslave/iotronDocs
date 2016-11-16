import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { IPatient } from '../../shared';
import { ServicesPage } from '../services/services';

import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  patient: Array<IPatient>;
  patientResults: Array<IPatient>;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.patient = [
      {
        hn: '123456',
        cid: '123456788',
        fullname: 'นายสถิตย์ เรียนพิศ',
        address: '123 หมู่ 5 ต.โคกพระ อ.กันทรวิชัย จ.มหาสารคาม'
      },
      {
        hn: '444456',
        cid: '445566600',
        fullname: 'นายพรชัย มุ่งกิจเจริญ',
        address: '11 หมู่ 2 ต.นาสีนวน อ.กันทรวิชัย จ.มหาสารคาม'
      },
    ];

  }

  ionViewDidLoad() {

  }

  getVisit(patient: IPatient) {
    this.navCtrl.push(ServicesPage, { patient: patient });
  }  

  getPatient(event) {
    let loading = this.loadingCtrl.create({
      content: 'Searching...'
    });

    loading.present();

    this.patientResults = [];
    let query = event.target.value;
    if (query) {
      let idx = _.findIndex(this.patient, { hn: query });
      if (idx >= 0) {
        // has result
        this.patientResults.push(this.patient[idx]);
      }

      // loading.dismiss();
    };

    loading.dismiss();
    
  }


}
