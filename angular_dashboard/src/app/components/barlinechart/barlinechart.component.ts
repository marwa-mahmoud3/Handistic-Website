import { Component } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-barlinechart',
  templateUrl: './barlinechart.component.html',
  styleUrls: ['./barlinechart.component.css']
})
export class BarlinechartComponent {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [250, 590, 600, 810, 860, 805, 120], label: 'Dataset1' },
    // { data: [280, 480, 400, 790, 960, 887, 140], label: 'Dataset2' }
  ];
  barChartColors: Color[] = [

    { 
      backgroundColor: '#75C181',
      borderColor: '#75C181',
    },
    // { 
    //   backgroundColor: '#5B99EA',
    //   borderColor: '#5B99EA',
    // }
  ];

}


