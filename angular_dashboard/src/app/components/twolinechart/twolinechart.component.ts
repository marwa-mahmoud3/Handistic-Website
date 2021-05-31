import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-twolinechart',
  templateUrl: './twolinechart.component.html',
  styleUrls: ['./twolinechart.component.css']
})
export class TwolinechartComponent  {


  // Array of different segments in chart
  lineChartsData: ChartDataSets[] = [
    { data: [58, 14, 23, 81, 56,100,68], label: 'Dataset 1' },
     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Dataset 2' }
  ];

  //Labels shown on the x-axis
  lineChartsLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // Define chart options
  lineChartsOptions: ChartOptions = {
    responsive: true
  };

  // Define colors of chart segments
  lineChartsColors: Color[] = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: '#89C894',
    },
    { // red
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: '#8AA1C7',
    }
  ];

  // Set true to show legends
  lineChartsLegend = true;

  // Define type of chart
  lineChartsType = 'line';

  lineChartsPlugins = [];

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}



