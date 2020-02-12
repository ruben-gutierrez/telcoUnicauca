import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { GraphService } from "src/app/services/graphs.service";
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import 'chartjs-plugin-zoom';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-graph-template',
  templateUrl: './graph-template.component.html',
  styleUrls: ['./graph-template.component.css']
})
export class GraphTemplateComponent implements OnInit {
  @Input() idGraph:string
  
  @ViewChildren( BaseChartDirective )  charts: BaseChartDirective;
  dataExport:any;
  graph:any;
  tableLabels:any
  lineChartData: Array<any> = [
    // { data: [100], label: 'Series A' },
    { data: [75, 69, 90, 91, 66, 65, 50], label: 'Series A' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series C' },
  ];
  public lineChartLabels: Label[] = ['2019-10-08T01:00:00.000Z', '2019-10-08T02:00:00.000Z', '2019-10-08T03:00:00.000Z', '2019-10-08T04:00:00.000Z', '2019-10-08T05:00:00.000Z', '2019-10-08T06:00:00.000Z', '2019-10-08T07:00:00.000Z'];
  public lineChartOptions: ChartOptions  = {
    responsive: true,
    scales: {
      yAxes: [{
        type: 'linear',
        ticks: {
          beginAtZero: true,
          // max: 200,
        }
      }],
      xAxes: [{
        type: 'time',
        time: {
          unit: 'hour',
          unitStepSize: 0.5,
          displayFormats: {
             'hour': 'DD HH mm'
          }
        },
      }]
    },
    plugins:{
      zoom: {
        zoom: {
            enabled: true,
            drag: true,
            mode: 'xy',
          },
      }
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor( private _graph:GraphService) {
   
   }

  ngOnInit() {
    this._graph.getGraph(this.idGraph)
    .subscribe(data=>{
     this.graph=data['content']
    })
   
    this._graph.getDataGraph(this.idGraph)
      .subscribe(data=>{
        
        if(data['status'] == 200){
          this.dataExport=data['content']
          // console.log(data[1])
          data=data['content']
          let preData=[]
          let prelabels=[]
          let labels=Object.keys(data[1])
          labels=labels.splice(1,labels.length)
          this.tableLabels=labels
          labels.forEach((label, index) => {
            preData.push({data:[], label: label })
          });
          for ( let line of Object.entries(data)){
            let dat = new Date(+line[1].field*1000).toISOString()
            prelabels.push( dat )
            for  (let [index,data] of Object.entries(labels)){
                preData[index].data.push(+Number.parseFloat(line[1][data]).toFixed(3) )
            } 
          }
          this.lineChartData=preData
          this.lineChartLabels=prelabels
          // graph.print= {data:preData, labels:prelabels}
        }
      })
  }

  resetZoom(){
    // console.log(this.charts['_results'][1].chart['resetZoom']())
    this.charts['_results'][0].chart['resetZoom']()
  }
  deleteGraph(idGraph){

    this._graph.deleteGraph(idGraph)
    .subscribe( data=>{
      console.log(data)
    })
  }
  
  downloadChart(){
    let file=new Blob([JSON.stringify(this.dataExport)], {
      type: 'application/json'
    });
    saveAs(file, "DataExport.json");
  }

  tableChart(){

  }

}
