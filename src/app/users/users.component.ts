import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { USERS } from '../../mock-user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = USERS;
    constructor() {
    
   }
  ngOnInit() {
  }
  add(name: string): void {
    // console.log('hello');
    name = name.trim();
    if (!name) { return; }
   // this.USERS.push(name);
    console.log(name);
  }
}
