import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { UserService } from '../services/user.service';
import { USERS } from '../mock-user';
import { CAT } from '../mock-categories';
import moment from 'moment/src/moment';
import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.sass', './highchart.component.css']
})

export class HighchartComponent implements OnInit {
  // series: any[];
  arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  users = USERS;
  chart: any;
  chart1: any;
  cat = CAT;
  // add point to chart series
  constructor(public userService: UserService) {
   }
  ngOnInit() {
     this.initialiseData();
     // this.secondChart();
  }
  /**
   * getdata function for complete list
   */
  initialiseData() {
     this.chart =  new Chart( {
      chart: {
      type: 'column'
    },
    title: {
      text: 'Annual Expenses month wise'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.getaxis(),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Monthly Expenses (INR in thousands)'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'complete',
      data: this.getdata(),
      type: undefined
    },
    {
      name: 'uncomplete',
      data: this.getdata1(),
      type: undefined
    }
    ]
  });
  }
  /**
   * get data
   */
  getdata() {
    let month_number: number;
   let month: any;
    for (let i = 0; i < this.userService.userList.length; i++) {
        month = this.userService.userList[i].month;
        month = moment(month, 'YYYY/MM/DD');
        month_number = month.format('M');
        console.log(month_number);
        this.arr2[month_number - 1] += 1;
       if (this.userService.userList[i].checked === true) {
      this.arr[month_number - 1] += 1;
      }
    }
    return this.arr;
  }

  /**
   * get data for uncomplete task
   */
  getdata1() {
    let month_number: number;
    let month: any;
    for (let i = 0; i < this.userService.userList.length; i++) {
        month = this.userService.userList[i].month;
        month = moment(month, 'YYYY/MM/DD');
        month_number = month.format('M');
      if (this.userService.userList[i].checked === true) {
            console.log(month_number);
            this.arr1[month_number - 1] += 1;
      }
    }
    for (let j = 0; j < 12; j++) {
      this.arr2[j] = this.arr2[j] - this.arr1[j];
    }
    return this.arr2;
  }

  /**
   * get axis value
   */
  getaxis() {
    const list1: string[] = [''];
  for (let i = 0; i < this.cat.length; i++ ) {
    list1[i] = this.cat[i].axis;
  }
  return list1;
  }
}
