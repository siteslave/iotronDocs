import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

let fs = require('fs');

@Injectable()
export class Image {

  constructor(public http: Http) {
    console.log('Hello Image Provider');
  }

  base64Encode(file) {
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
  };

}
