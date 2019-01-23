import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { USERS } from '../mock-user';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  // user : User;
  // form: FormControl;
  // date: Date;
  wb: XLSX.WorkBook = XLSX.read('./username100.xls');
  arr: string[];
  users = USERS;
  totalSelected = 0;
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  // fileName: string = 'username100.xls';
  formattedData: any;
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit() {
    this.formattedData = {};
  }
  //  add element in list
  adduser(newUser: string): void {
    console.log(newUser);
    const user = new User();
    if (!newUser) { return; }
    user.name = newUser;
    user.date = new Date();
    user.checked = false;
    user.month = Math.floor((Math.random() * 12) + 1);
    this.users.push(user);
    console.log(user.date);
  }
  // remove element from list
  removeuser(user: User, index: number): void {
    console.log(user , index);
    if (user.checked === true) {
        user.checked = false;
        this.totalSelected--;
    }
    this.users.splice(index, 1);
  }
  updateTotal(user: User): void {
    if (user.checked === false) {
      this.totalSelected++;
      user.checked = true;
    } else {
      user.checked = false;
      this.totalSelected--;
    }
    console.log(user);
  }
  /**
   * upload file to display in list
   */
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // console.log('this.data', this.data);
      this.formatData();
    };
    reader.readAsBinaryString(target.files[0]);
  }

  /**
   * Format Data
   */
  formatData() {
    const header = [];
    header.push(...this.data[0]);
    this.formattedData = [];
    for (let i = 1; i < this.data.length; i++) {
      const name1: string = String(this.data[i][2]);
      const comp = this.data[i][3];
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
    console.log('formatted Data', this.formattedData);
  }
  /**
   * export to json file
   */
  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  }
  updateall(): void {
      if (this.totalSelected !== this.users.length) {
        this.totalSelected = 0;
        for (let i = 0; i < this.users.length; i++) {
        this.users[i].checked = true;
        this.totalSelected++;
        }
      } else {
        for (let i = 0; i < this.users.length; i++) {
          this.users[i].checked = false;
          this.totalSelected--;
        }
    }
  }
}
