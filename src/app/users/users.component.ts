import { Component, OnInit}from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-user';
// import { UserService } from '../user.service';  
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
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
  adduser(newUser : string):void {
    var user = new User(); 
     if (!newUser) { return; }
    user.name = newUser;
    // console.log(this.user.name);
    this.users.push(user);   
        // var oldItems = JSON.parse(localStorage.getItem('USERS')) || [];
        // oldItems.push(user);
        console.log(this.users); 
        // JSON.parse(localStorage.getItem('oldItems'));
        // console.log(JSON.parse(localStorage.getItem('USERS')));
    //    USERS.push(newItem);
    //    console.log(USERS);
}
  removeuser(index : number): void {
   // this.users = this.users.filter(h => h !== user );
    this.users.splice(index,1);
    console.log(this.users);
    
  //return this;
  }
}
    //var obj = new User()
    // if (!name) { return; } 
    // 
    // var newItem = {
    //      'name': name,
    // };
    // oldItems.push(newItem);
    //  localStorage.setItem('newItem', JSON.stringify(USERS));

    //   JSON.parse(localStorage.getItem('oldItems'));

    //   console.log(JSON.parse(localStorage.getItem('USERS')));
// };
    
// obj.name = name;
// var oldItems = JSON.parse(localStorage.getItem('USERS')) || [];  
//   USERS.push(obj);
//   localStorage.setItem('USERS', JSON.stringify(USERS));
//   //localStorage.setItem( oldItems, JSON.stringify(USERS));
//   //console.log(name);
//   var retrievedData = localStorage.getItem(oldItems);
//   var movies2 = JSON.parse(retrievedData);

//    console.log(JSON.parse(localStorage.getItem('USERS')));
   
// //making sure itstill is an array
// // alert(retrievedData);/ 
//
