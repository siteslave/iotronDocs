import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Image } from '../../providers/image';
import { IImage } from '../../shared';
import { Connection } from '../../providers/connection';

var mime = require('mime-types');

import async from 'async';
import _ from 'lodash';

const {dialog, app} = require('electron').remote;
const path = require('path');

@Component({
  selector: 'page-uploader',
  templateUrl: 'uploader.html'
})
export class UploaderPage {

  files: Array<IImage> = [];
  pool: any;

  constructor(
    public navCtrl: NavController,
    public image: Image,
    public connection: Connection,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.pool = this.connection.getDocConnectionPool();
   }

  ionViewDidLoad() {
    this.getImage();
  }

  selectImage(type: number) {
    let defaultPath = app.getPath('pictures');

    let openConfig = { 
      title: 'เลือกไฟล์',
      defaultPath: defaultPath,
      filters: [
        {name: 'Images', extensions: ['jpg', 'png']}
      ],
      properties: ['multiSelections', 'openFile']
    };
  
    dialog.showOpenDialog(openConfig, (filePath) => {
      let _files = [];

      if (filePath.length) {
        async.forEachOf(filePath, (file: any, k: any, cb) => {

          try {
            let _base64 = this.image.base64Encode(file);
            let ext = path.extname(file);
            let base64 = null;

            if (ext.toLowerCase() == '.jpg') {
              base64 = `data:image/jpg;base64,${_base64}`;
            } else if (ext.toLowerCase() == '.png') {
              base64 = `data:image/png;base64,${_base64}`;
            }
            
            let _file: IImage = { 
              name: path.basename(file),
              base64: _base64,
              path: file,
              ext: ext,
              type: type,
              mime: mime.lookup(file)
            };

            _files.push(_file);

            
          } catch (e) {
            return cb(e);
          }         
          
          cb();

        }, (err) => {
          if (err) { console.error(err) };
          this.files = _files;
          console.log(this.files);
        });
        
        // filePath.forEach(file => {
          
        // });
      }
    });

  }

  remove(image: IImage) {
    let idx = _.findIndex(this.files, { name: image.name });
    this.files.splice(idx, 1);
  }

  doUpload() {
    
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.pool.getConnection((err, conn) => {
      if (err) {
        console.log(err)
        loader.dismiss();
      } else {
        async.forEachOf(this.files, (value: IImage, key, cb) => {

          let sql = 'INSERT INTO docs (hn, vn, image, mime_type) VALUES (?, ?, ?, ?)';
          conn.query(sql, ['xxx', 'wwww', value.base64, value.mime], (err, rows) => {
            if (err) cb(err);
            else console.log(rows.insertId);
          });
          loader.dismiss();
          cb();
          
        }, err => {
          if (err) {
            let toast = this.toastCtrl.create({
              message: 'Error: ' + JSON.stringify(err),
              duration: 3000
            });
            toast.present();
          }

          let toast = this.toastCtrl.create({
            message: 'Upload successfully',
            duration: 3000
          });
          toast.present();
          conn.release();
        });
        

      }
    });

  }

  getImage() {
    this.pool.getConnection((err, conn) => {
      if (err) {
        console.log(err)
      } else {
        let sql = 'SELECT * FROM docs LIMIT 1';
        conn.query(sql, (err, rows) => {
          if (err) console.log(err);
          else {
            this.files[0] = { name: 'xxxx', path: 'xxx', base64: rows[0].image, ext: 'jpg' };
          }
        });

        conn.release()
      }
    });
  }
}
