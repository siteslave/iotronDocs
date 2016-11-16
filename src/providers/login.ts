import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Connection } from '../providers/connection';

@Injectable()
export class Login {
  pool: any;

  constructor(public http: Http, public connection: Connection) {
    this.pool = this.connection.getDocConnectionPool();
  }

  doLogin(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
      if (err) {
        console.log(err)
        reject(err);
      } else {
        let sql = 'SELECT * FROM users WHERE username=? AND password=?';
        conn.query(sql, [username, password], (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          else {
            resolve(rows[0]);
          }
        });

        conn.release()
      }
    });
    })
  }

}
