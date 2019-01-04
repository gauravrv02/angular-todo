import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-user';
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
  USERS.push(name);
  localStorage['name'] = name;
  localStorage.setItem( name, JSON.stringify(USERS));
  console.log(name);
  var retrievedData = localStorage.getItem(name);
  var movies2 = JSON.parse(retrievedData);
 
//making sure it still is an array
// alert(retrievedData);
  }
}
