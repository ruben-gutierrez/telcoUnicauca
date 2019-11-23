import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';
// graph


@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 400], label: 'Delay' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions  = {
    responsive: true,
    
    // zoom: {
    //   enabled: true,
    //   drag: false,

    //   // Drag-to-zoom rectangle style can be customized
    //   // drag: {
    //   // 	 borderColor: 'rgba(225,225,225,0.3)'
    //   // 	 borderWidth: 5,
    //   // 	 backgroundColor: 'rgb(225,225,225)'
    //   // },

    //   // Zooming directions. Remove the appropriate direction to disable
    //   // Eg. 'y' would only allow zooming in the y direction
    //   mode: 'xy',

    //   rangeMin: {
    //     // Format of min zoom range depends on scale type
    //     x: null,
    //     y: null
    //   },
    //   rangeMax: {
    //     // Format of max zoom range depends on scale type
    //     x: null,
    //     y: null
    //   },

    //   // Speed of zoom via mouse wheel
    //   // (percentage of zoom on a wheel event)
    //   speed: 0.1,

    //   // Function called once zooming is completed
    //   // Useful for dynamic data loading
    //   onZoom: function ({ chart }) { console.log(`I was zoomed!!!`); }
    // }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [zoomPlugin];

  constructor() { }
  
  ngOnInit() {

  }

   

}
