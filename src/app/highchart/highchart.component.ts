import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { UserService } from '../user.service';
import { USERS } from '../mock-user';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.sass', './highchart.component.css']
})
export class HighchartComponent implements OnInit {
 // series: any[];
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
    series: [],
  });
  // add point to chart serie
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  getdata(): void {
    let arr =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 1; i < USERS.length; i++) {
        arr[USERS[i].month] += 1;
    }
    for (let j = 2; j < 13; j++) {
        arr[j] +=  arr[j - 1];
    }
    console.log(arr);
  }
    }
