import { Injectable } from '@angular/core';
import { USERS } from '../mock-user';
import { User} from '../user';
import moment from 'moment/src/moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: any;
  userList: any;
  user: User;
  totalSelected: number;
// puts rand(t1..t2);

  constructor() {
    this.userList = USERS;
    this.totalSelected = 0;
   }

  adduser(newUser: string): User[] {
    if (!newUser) { return; }
     this.user = {
       'name': newUser,
       'month': this.randomDate(new Date(2018, 1, 1), new Date()),
       'date': new Date(),
       'checked': false
     };
    this.userList.push(this.user);
    return this.userList;
  }
    // remove element from list
    removeuser(user: User, index: number): User[] {
      this.userList.splice(index, 1);
    return this.userList;
}

changeMonth(index: number, month: number) {
  // console.log(user.month);
  this.userList[index].month = month;
  console.log(index, this.userList[index].month);
  // console.log(user, user.month);
  return USERS;
}
 randomDate(start: Date, end: Date) {
   let date: any;
    date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    date = moment(date, 'YYYY/MM/DD');
    date = date.format('MMM');
    return date;
}
}
