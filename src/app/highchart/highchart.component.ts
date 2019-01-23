import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { UserService } from '../user.service';
import { USERS } from '../mock-user';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.sass', './highchart.component.css']
})
export class HighchartComponent implements OnInit {
 // series: any[];
  arr =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr1 =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 users = USERS;
  chart = new Chart( {
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
      categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
      ],
      crosshair: true
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
    series: [ {
        name : 'complete',
        data : this.getdata(),
      },
      {
        name : 'uncomplete',
        data :  this.getdata1(),
      }
    ],
  });
  // add point to chart serie
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  getdata() {
    for (let i = 0; i < USERS.length; i++) {
        this.arr[USERS[i].month - 1] += 1;
    }
    for (let j = 1; j < 12; j++) {
        this.arr[j] +=  this.arr[j - 1];
    }
    return this.arr;
  }
  getdata1() {
    for (let i = 0; i < USERS.length; i++) {
        this.arr1[USERS[i].month - 1] += 1;
    }
    for (let j = 1; j < 12; j++) {
        this.arr1[j] +=  this.arr[j - 1];
    }
    for (let j = 0; j < 12; j++) {
      this.arr1[j] = USERS.length - this.arr1[j];
  }
    return this.arr1;
  }
    }
