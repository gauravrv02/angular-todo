import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-user';
import { UserService } from '../user.service';  
import { Observable } from 'rxjs';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = USERS;
    constructor(private localstorage: LocalStorage) {
    
   }
  ngOnInit() {}
  add(name: User): void {
//     var oldItems = JSON.parse(localStorage.getItem('USERS')) || [];
    
//     var newItem = {
//         'product-name': name,
//     };
    
//     oldItems.push(newItem);
    
//     localStorage.setItem('USERS', JSON.stringify(oldItems));
// };

console.log(JSON.parse(localStorage.getItem('USERS')));
    
  USERS.push(name);
  localStorage.setItem('USERS', JSON.stringify(USERS));
  localStorage['name'] = name;
  localStorage.setItem( name, JSON.stringify(USERS));
  console.log(name);
  var retrievedData = localStorage.getItem(name);
  var movies2 = JSON.parse(retrievedData);
 
//making sure it still is an array
// alert(retrievedData);
  }
}