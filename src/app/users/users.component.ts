import { Component, OnInit} from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-user';
    // import { UserService } from '../user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
     // user : User;
    users = USERS;
    constructor() {
   }
  ngOnInit() {
  }
    //  add element in list
    adduser(newUser: string): void {
    const user = new User();
      if (!newUser) { return; }
    user.name = newUser;
    this.users.push(user);
    console.log(this.users);
}
    // remove element from list
    removeuser(index: number): void {
    this.users.splice(index , 1);
    console.log(this.users);
  }
}
