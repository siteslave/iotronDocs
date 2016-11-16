import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const mysql = require('mysql');

@Injectable()
export class Connection {

  constructor(public http: Http) {
    console.log('Hello Connection Provider');
  }

getHOSxPConnectionPool() {
    let HOS_HOST = localStorage.getItem('HOS_HOST') || 'localhost';
    let HOS_DBNAME = localStorage.getItem('HOS_DBNAME') || 'hos';
    let HOS_USER = localStorage.getItem('HOS_USER') || 'sa';
    let HOS_PASSWORD = localStorage.getItem('HOS_PASSWORD') || 'sa';
    let HOS_PORT = localStorage.getItem('HOS_PORT') || '3306';
 
    let pool = mysql.createPool({
      host: HOS_HOST,
      user: HOS_USER,
      password: HOS_PASSWORD,
      database: HOS_DBNAME,
      port: HOS_PORT
    });

    pool.on('connection', function (connection) {
      connection.query('SET NAMES utf8')
    });

    return pool
  }

  getDocConnectionPool() {
    let DOC_HOST = localStorage.getItem('DOC_HOST') || 'localhost';
    let DOC_DBNAME = localStorage.getItem('DOC_DBNAME') || 'emr_docs';
    let DOC_USER = localStorage.getItem('DOC_USER') || 'root';
    let DOC_PASSWORD = localStorage.getItem('DOC_PASSWORD') || '043789124';
    let DOC_PORT = localStorage.getItem('DOC_PORT') || '3306';
 
    let pool = mysql.createPool({
      host: DOC_HOST,
      user: DOC_USER,
      password: DOC_PASSWORD,
      database: DOC_DBNAME,
      port: DOC_PORT
    });

    pool.on('connection', function (connection) {
      connection.query('SET NAMES utf8')
    });

    return pool
  }
  
}
