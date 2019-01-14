import { Component, OnInit} from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-user';
    // import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
     // user : User;
     form: FormControl;
    users = USERS;
     totalSelected = 0;
    constructor() {
   }
  ngOnInit() {
    }
    //  add element in list
    adduser(newUser: string): void {
    const user = new User();
      if (!newUser) { return; }
    user.name = newUser;
    user.checked = false;
    this.users.push(user);
    }
    // remove element from list
    removeuser(user: User, index: number): void {
      if (user.checked === true) {
      this.totalSelected-- ;
    }
      this.users.splice(index , 1);
  }
    updateTotal(user: User): void {
    console.log(user);
     if (user.checked === false) {
      this.totalSelected++;
      user.checked = true;
     } else {
      user.checked = false;
      this.totalSelected--;
    }
    console.log(this.totalSelected);
}
}
