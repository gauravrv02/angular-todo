import { Injectable } from '@angular/core';
import { USERS } from './mock-user';
import { User} from './user';
import * as XLSX from 'xlsx';
import moment from 'moment/src/moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: any;
  formattedData: any;
  constructor() { }

  adduser(newUser: string): User[] {
    const user = new User();
    if (!newUser) { return; }
    user.name = newUser;
    user.date = new Date();
    user.checked = false;
    user.month = Math.floor((Math.random() * 12) + 1);
    USERS.push(user);
    return USERS;
  }
    // remove element from list
    removeuser(user: User, index: number): User[] {
      USERS.splice(index, 1);
    return USERS;
}

formatData() {
  const header = [];
  let check;
  header.push(...this.data[0]);
  this.formattedData = [];
  for (let i = 1; i < this.data.length; i++) {
    // extract month from date by moment.js
    const name1: string = String(this.data[i][2]);
    check = moment(this.data[i][4], 'YYYY/MM/DD');
    const comp =  check.format('M');
    console.log(comp);
    // this.users.push({name: name1, checked: false, date: new Date()});
    USERS.push({name: name1, checked: false, date: new Date(), month: comp});
    this.formattedData.push({
        'index': this.data[i][0],
        'title': this.data[i][1],
        'name' : this.data[i][2],
        'value1': this.data[i][3],
        'value2': this.data[i][4],
        'value3': this.data[i][5],
        'value4': this.data[i][6],
        'value5': this.data[i][7],
        'value6': this.data[i][8],
        'value7': this.data[i][9],
    });
    // for (let j = 1; j < this.formattedData.length; j++) {
    //       this.users.push(this.formattedData.name[j]);
    // }
  }
  console.log(USERS);
  return USERS;
}
}
