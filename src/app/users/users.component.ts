import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { USERS } from '../mock-user';
import moment from 'moment/src/moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

type AOA = any[][];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
   months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  wb: XLSX.WorkBook = XLSX.read('./username100.xls');
  arr: string[];
  users: any;
  data: AOA;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  formattedData: any;
  totalSelected: number;
  selectAll: boolean;
  events: string[] = [];
   date: any;
  constructor(private router: Router, private userService: UserService) {
    this.users = this.userService.userList;
  }

  ngOnInit() {
    // this.usermonth();
    this.formattedData = {};
    this.selectAll = false;
    this.totalSelected = 0;
    this.date = new Date();
  }
  /**
   * add element in list
   */
  adduser(newUser: string): void {
    this.userService.adduser(newUser);
    // console.log(user.date);
  }
  // remove element from list
  removeuser(user: User, index: number): void {
    if (user.checked === true) {
        user.checked = false;
        this.userService.totalSelected--;
    }
    this.userService.removeuser(user, index);
  }
  updateTotal(index: number): void {
    this.totalSelected = this.userService.updateTotal(index);
    }
    // console.log(user);
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
    let check;
    header.push(...this.data[0]);
    this.formattedData = [];
    for (let i = 1; i < this.data.length; i++) {
      // extract month from date by moment.js
      const name1: string = String(this.data[i][2]);
      check = moment(this.data[i][4], 'YYYY/MM/DD');
      const comp =  check.format('MMM');
      // this.users.push({name: name1, checked: false, date: new Date()});
      this.userService.userList.push({name: name1, checked: false, date: new Date(), month: check});
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
    }
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
  /**
   * check all
   */
  updateall(): void {
      if (this.selectAll === false ) {
        this.userService.totalSelected = 0;
        for (let i = 0; i < this.users.length; i++) {
        this.userService.userList[i].checked = true;
        this.userService.totalSelected++;
        this.selectAll = true;
        }
      } else {
        for (let i = 0; i < this.users.length; i++) {
          this.users[i].checked = false;
          this.userService.totalSelected--;
          this.selectAll = false;
        }
    }
    this.totalSelected = this.userService.totalSelected;
  }
  /**
   * Change user month
   */
  changeMonth( event: MatDatepickerInputEvent<Date>, index: number): void {
    event.value = moment(event.value, 'YYYY/MM/DD');
    let month: any;
    month = event.value;
    month = month.format('YYYY/MM/DD');
    console.log(month);
    this.userService.changeMonth(index, month);
  }

  }
  /**
   *  add date event
   */
  // addEvent(type: string, event: ) {
  //   this.events.push(`${type}: ${event.value}`);
  //   console.log(event.value);
  //
