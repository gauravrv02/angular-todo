import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { UserService } from '../user.service';
import { USERS } from '../mock-user';
import { CAT} from '../mock-categories';
@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.sass', './highchart.component.css']
})
export class HighchartComponent implements OnInit {
  // series: any[];
  arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  users = USERS;
  chart: any;
  cat = CAT;
  // add point to chart serie
  constructor(private userService: UserService) {
   }
  ngOnInit() {
     this.initialiseData();
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
      type: undefined
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
  getdata() {
    for (let i = 0; i < USERS.length; i++) {
      this.arr[USERS[i].month - 1] += 1;
    }
    for (let j = 1; j < 12; j++) {
      this.arr[j] += this.arr[j - 1];
    }
    return this.arr;
  }
  /**
   * get data for uncomplete task
   */
  getdata1() {
    for (let i = 0; i < USERS.length; i++) {
      this.arr1[USERS[i].month - 1] += 1;
    }
    for (let j = 1; j < 12; j++) {
      this.arr1[j] += this.arr[j - 1];
    }
    for (let j = 0; j < 12; j++) {
      this.arr1[j] = USERS.length - this.arr1[j];
    }
    return this.arr1;
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
