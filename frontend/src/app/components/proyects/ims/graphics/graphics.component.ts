import { Component, OnInit, ViewChildren, ɵConsole } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
// import * as zoomPlugin from 'chartjs-plugin-zoom';
import { UsersService } from "src/app/services/users.service";
import { ArquitectureService } from "src/app/services/arquitectures.service";
import { GraphService } from "src/app/services/graphs.service";
import 'chartjs-plugin-zoom';

// graph


@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  arquitectures:any;
  @ViewChildren( BaseChartDirective )  charts: BaseChartDirective;

  lineChartData: Array<any> = [
    // { data: [100], label: 'Series A' },
    { data: [75, 69, 90, 91, 66, 65, 50], label: 'Series A' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' }
  ];
  lineChartData2: Array<any> = [
    // { data: [100], label: 'Series A' },
    { data: [75, 69, 90, 91, 66, 65, 50], label: 'Series A' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' },
    { data: [75, 39, 20, 51, 76, 85, 70], label: 'Series B' }
  ];
  public lineChartLabels: Label[] = ['2019-10-08T01:00:00.000Z', '2019-10-08T02:00:00.000Z', '2019-10-08T03:00:00.000Z', '2019-10-08T04:00:00.000Z', '2019-10-08T05:00:00.000Z', '2019-10-08T06:00:00.000Z', '2019-10-08T07:00:00.000Z'];
  public lineChartLabels2: Label[] = ['2019-10-08T01:00:00.000Z', '2019-10-08T02:00:00.000Z', '2019-10-08T03:00:00.000Z', '2019-10-08T04:00:00.000Z', '2019-10-08T05:00:00.000Z', '2019-10-08T06:00:00.000Z', '2019-10-08T07:00:00.000Z'];
  graphs=[
    {data:this.lineChartData, labels:this.lineChartLabels},
    {data:this.lineChartData, labels:this.lineChartLabels},
    {data:this.lineChartData, labels:this.lineChartLabels},
    {data:this.lineChartData, labels:this.lineChartLabels},
    {data:this.lineChartData, labels:this.lineChartLabels},
  ];
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
        // time: {
        //   unit: 'day',
        //   unitStepSize: 1,
        //   displayFormats: {
        //      'day': 'MMM DD'
        //   }
        // },
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
  
  constructor( private _user : UsersService,
               private _arquitecture : ArquitectureService,
               private _graph : GraphService,
               ) { }
  
  ngOnInit() {
    
    this._arquitecture.getArquitectures()
    .subscribe( async data=>{
      this.arquitectures = this.arqReserved(data, this._user.userActive._id);
      console.log(this.arquitectures)
      this.arquitectures.forEach(arquitecture=>{
        // console.log(arquitecture)
        if (arquitecture.vmCoreIMS.length > 0) {
          arquitecture.vmCoreIMS.forEach(vmCore => {
            // console.log(vmCore)
            if (vmCore.graphs.length > 0) {
              vmCore.graphs.forEach(graph => {
                    this._graph.getDataGraph(graph._id)
                    .subscribe(async data =>{
                      if(data['status'] == 200){
                        data=data['content']
                        let preData=[]
                        let prelabels=[]
                        let labels=Object.keys(data[1])
                        labels=labels.splice(1,labels.length)
                        await labels.forEach((label, index) => {
                          preData.push({data:[], label: label })
                        });
                        for await ( let line of Object.entries(data)){
                          let dat = new Date(+line[1].field*1000).toISOString()
                          prelabels.push( dat )
                          for  await (let [index,data] of Object.entries(labels)){
                              preData[index].data.push(+Number.parseFloat(line[1][data]).toFixed(3) )
                          } 
                        }
                        
                        graph.print= {data:preData, labels:prelabels}
                      }else{
                        graph.print={data:this.lineChartData, labels:this.lineChartLabels}
                      }
                    
                    });
                   });
               
            }else{
              console.log('no hay graficas')
             }
           
            });
        }
       
        if (arquitecture.vmAditionals.length > 0) {
          arquitecture.vmAditionals.forEach(vmAditional => {
            if (vmAditional.graphs.length > 0) {
              vmAditional.graphs.forEach(graph => {
                this._graph.getDataGraph(graph._id)
                .subscribe(data =>{
                  
                  if(data['status'] == 200){
                    data=data['content']
                    let preData=[]
                    let prelabels=[]
                    let labels=Object.keys(data[1])
                    labels=labels.splice(1,labels.length)
                    // labels.forEach((label, index) => {
                    labels.forEach(label => {
                      preData.push({data:[], label: label })
                      
                    });
                    
                    for ( let line of Object.entries(data)){
                      let dat = new Date(+line[1].field*1000).toISOString()
                      prelabels.push( dat )
                      for  (let [index,data] of Object.entries(labels)){
                          preData[index].data.push(+Number.parseFloat(line[1][data]).toFixed(3) )
                      } 
                    }
                    
                    graph.print= {data:preData, labels:prelabels}
                  }else{
                    graph.print={data:this.lineChartData, labels:this.lineChartLabels}
                  }
                
                });
              });
               
            }else{
              console.log('no hay graficas')
             }
            
         });
        }
       
      })
     
      
      // console.log(this.arquitectures)
    })
    // this.dataGraph('5e245ae886e6051340671e06')

  }
  arqReserved(arquitectures, idUser) {

    return arquitectures.filter(function(arq){
      // console.log(arq);
      return arq.status == idUser;
    })
  }  
  dataTest(){
    return this.lineChartData2
  }
  labelTest(){
    return this.lineChartLabels2
  }
  async dataGraph(idServer){
    let ans=[]
    this._graph.getDataGraph(idServer)
      .subscribe(async data =>{
        if(data['status'] == 200){

          data=data['content']
          let preData=[]
          let prelabels=[]
          let labels=Object.keys(data[1])
          labels=labels.splice(1,labels.length)
          await labels.forEach((label, index) => {
            preData.push({data:[], label: label })
          });
          for await ( let line of Object.entries(data)){
            let dat = new Date(+line[1].field*1000).toISOString()
            prelabels.push( dat )
            for  await (let [index,data] of Object.entries(labels)){
                preData[index].data.push(+Number.parseFloat(line[1][data]).toFixed(3) )
            } 
          }
          // console.log(preData)
          // console.log(prelabels)
          ans= [preData, prelabels]
        }else{
          ans=[this.lineChartData, this.lineChartLabels]
        }

        
        // let preData=[]
        // let prelabels=[]
        // let labels=Object.keys(data[1])
        // labels=labels.splice(1,labels.length)
        // await labels.forEach((label, index) => {
        //   preData.push({data:[], label: label })
        // });
        // for await ( let line of Object.entries(data)){
        //   let dat = new Date(+line[1].field*1000).toISOString()
        //   prelabels.push( dat )
        //   for  await (let [index,data] of Object.entries(labels)){
        //       preData[index].data.push(+Number.parseFloat(line[1][data]).toFixed(3) )
        //   } 
        // }
        // console.log(preData)
        // // this.lineChartData=preData
        // console.log(prelabels)
        // // this.lineChartLabels=prelabels
        // // this.lineChartData=preData
        // // this.lineChartLabels=prelabels;
        // // this.graphs.push({data:preData,labels:prelabels})
      })
      // console.log(ans)
      return ans


  }

}
