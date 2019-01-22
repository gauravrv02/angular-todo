import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.sass', './highchart.component.css']
})
export class HighchartComponent implements OnInit {
  series: any[];
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
    series: [
      {
    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  }
]
  });
  // add point to chart serie
  constructor() { }

  ngOnInit() {
  }
    }
