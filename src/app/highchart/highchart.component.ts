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
     this.secondChart();
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
   * second chart build;
   */
  secondChart() {
    //   console.log('hi');
const gaugeOptions = {
    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// The speed gauge
const chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 200,
        title: {
            text: 'Speed'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Speed',
        data: [80],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ( 'red' || 'black') + '">{y}</span><br/>' +
                   '<span style="font-size:12px;color:silver">km/h</span></div>'
        },
        tooltip: {
            valueSuffix: ' km/h'
        }
    }]

}));

// The RPM gauge
// const chartRpm = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
//     yAxis: {
//         min: 0,
//         max: 5,
//         title: {
//             text: 'RPM'
//         }
//     },

//     series: [{
//         name: 'RPM',
//         data: [1],
//         dataLabels: {
//             format: '<div style="text-align:center"><span style="font-size:25px;color:' +
//                 ( 'red' || 'black') + '">{y:.1f}</span><br/>' +
//                    '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
//         },
//         tooltip: {
//             valueSuffix: ' revolutions/min'
//         }
//     }]

// }));

// Bring life to the dials
setInterval(function () {
    // Speed
    let point,
        newVal,
        inc;

    if (chartSpeed) {
        point = chartSpeed.series[0].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200) {
            newVal = point.y - inc;
        }

        point.update(newVal);
    }

    // RPM
    // if (chartRpm) {
    //     point = chartRpm.series[0].points[0];
    //     inc = Math.random() - 0.5;
    //     newVal = point.y + inc;

    //     if (newVal < 0 || newVal > 5) {
    //         newVal = point.y - inc;
    //     }

    //     point.update(newVal);
    // }
}, 2000);
  }
  /**
   * get data
   */

  getdata() {
    let month_number: number;
    for (let i = 0; i < this.userService.userList.length; i++) {
        month_number = moment().month(this.userService.userList[i].month).format('M');
        this.arr2[month_number - 1] += 1;
       if (this.userService.userList[i].checked === true) {
     // console.log(moment().month(this.userService.userList[i].month).format('M'), this.userService.userList.length);
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
    for (let i = 0; i < this.userService.userList.length; i++) {
      if (this.userService.userList[i].checked === true) {
      month_number = moment().month(this.userService.userList[i].month).format('M');
      this.arr1[month_number - 1] += 1;
    }
  }
    // for (let j = 1; j < 12; j++) {
    //   this.arr1[j] += this.arr[j - 1];
    // }
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
