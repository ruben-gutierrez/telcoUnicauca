import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { GraphsService } from "src/app/services/services.index";
import { BaseChartDirective, Label, Color } from 'ng2-charts';
// import { ChartOptions } from 'chart.js';
import 'chartjs-plugin-zoom';
import { saveAs } from 'file-saver';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { TestsMovilService, } from 'src/app/services/services.index';
// import { Console } from 'console';
import { getLocaleDateFormat } from '@angular/common';
import { PreloadingStrategy } from '@angular/router';

@Component({
  selector: 'app-graphmovil-template',
  templateUrl: './graphmovil-template.component.html',
  styleUrls: ['./graphmovil-template.component.css']
})
export class GraphmovilTemplateComponent implements OnInit {
  // idGraph = null;
  // data = {}
   xlabel = [];
   ytemps = [];

  // tableLabels: any
  @Input() idGraph:string;
  @ViewChildren( BaseChartDirective )  charts: BaseChartDirective;
  dataExport:any;
  graph:any;
  tableLabels:any;
  preData = [];
  preData1 = [];
  preData2 = [];
  prelabels = [];   
  b=[];
  // constructor(private _tests: TestsMovilService) {
  //   this.getdata();
  // }
  constructor( private _graph:GraphsService, private _tests: TestsMovilService){

  }
  ngOnInit(){
    // setTimeout(()=>{        
    //   console.log("reload chart")                   //<<<---using ()=> syntax
    //   this.lineChartData = [
    //     // { data: [100], label: 'Series A' },
    //     { data: [1, 50, 500, 91, 66, 65, 50], label: 'Series A' },
    //     { data: [1, 50, 500, 51, 76, 85, 70], label: 'Series B' },
        
    //   ];
    // }, 5000);



   
    
    
    this.getData()
    // setInterval(() => {
    //   this.getData()
    // }, 30000);

   
  }

  getData() {

    this._tests.getdata('1')
      .subscribe(data => {
        // this.data = data;
        data = data['content']
        let labelx="SNR"
        let tbdatos=" err0"
        let tbdatos1=" err1"
        let tbdatos2=" err2"
        console.log("datoosxx", data)
        
        

        for(let index in data){
          const dato= data[index];
          // console.log("for",dato[" err0"])   
        //  var rep= Math.round(dato[labelx])
          this.prelabels.push(dato[labelx])         
          // this.prelabels.push(rep)         
          this.preData.push(dato[tbdatos]/1000)
          this.preData1.push(dato[tbdatos1]/1000)
          this.preData2.push(dato[tbdatos2]/1000)
          // this.b= this.prelabels.filter( this.onlyUnique);
          this.b=[1,2,3,4,5,6,7,8] 
          // console.log(this.prelabels)
          // console.log(this.b)
        }
        
               
      })
      
  }

  reemplazarDuplicados(value, index, self) { 
    return (self.indexOf(value) === index);
}
 onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}




  lineChartData: Array<any> = [
    // { data: [100], label: 'Series A' },
    // { data: [75, 69, 90, 91, 66, 65, 50], label: 'Series A' },
    //{ data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' },
    //{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series C' },
    { data: this.preData, 
      label:'prueba 1',
       fill:false,
        borderWidth:2,
       
  },
    // { data: this.preData1,
    //    label:'prueba 2', 
    //    fill:false,
    //    borderWidth:1,},
    // { data: this.preData2, 
    //   label:'prueba 3',
    //    fill:false,
    //    borderWidth:1},
        
  ];

  lineChartLabels: Label[] = this.prelabels;

  // lineChartLabels:["0s", "10s", "20s", "30s", "40s", "50s", "60s"];
 
  lineChartColors: Color[] = [
    {
      pointBorderColor: 'orange',
      pointBackgroundColor: 'rgba(255,150,0,0.5)',
      borderColor: 'orange',


    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  lineChartOptions = {
    tooltips: {
      callbacks: {
          label: function (tooltipItem, data) {
              return Number(tooltipItem.yLabel).toFixed(2);
          }
      }
  },
    responsive: true,
    fill:false,
    datasetFill:false,
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'FER'
        },
       }], 
    xAxes: [{
      display:true,
      scaleLabel: {
        display: true,
        labelString: 'SNR'
      },
            ticks:{
        
        precision:0,
        fixedStepSize: 1,
        // stepSize: 1,
        stepSize: 2.2,
      //   callback: function(value) {
      //     return Number.isInteger(value) ? value : null;
      // }
      //   userCallback: function(label, index, labels) {
      //     // when the floored value is the same as the value we have a whole number
      //     if (Math.floor(label) === label) {
      //         return label;
      //     }
       
      // }
    }
    }]
  }

  };
  

  

}
