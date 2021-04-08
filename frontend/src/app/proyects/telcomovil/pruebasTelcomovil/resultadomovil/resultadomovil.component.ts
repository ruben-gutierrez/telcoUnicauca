import { TestsMovilService, } from 'src/app/services/services.index';
import { isUndefined } from 'util';
import { GraphmovilTemplateComponent } from '../../graficastelcomovil/graphmovil-template/graphmovil-template.component';
import { NewServerComponent } from '../../../ims/arquitectures/arquitecture/new-server/new-server.component';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import 'chartjs-plugin-zoom';
import { GraficastelcomovilComponent } from '../../graficastelcomovil/graficastelcomovil.component';
import { ActivatedRoute } from "@angular/router";
import { GraphsService } from 'src/app/services/services.index';
import { MachinesMovilService, } from 'src/app/services/services.index';
import { Component, OnInit, Input, ViewChildren } from '@angular/core';
// import { ChartOptions } from 'chart.js';
import 'chartjs-plugin-zoom';
import { saveAs } from 'file-saver';
import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Console } from 'console';
import { getLocaleDateFormat } from '@angular/common';
import { PreloadingStrategy } from '@angular/router';
import 'chartjs-plugin-zoom';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-resultadomovil',
  templateUrl: './resultadomovil.component.html',
  styleUrls: ['./resultadomovil.component.css']
})
export class ResultadomovilComponent implements OnInit {
  data = {}
  idtest;
  test:any;
  name:any="prueba";




  @Input() idGraph: string;
  @ViewChildren(BaseChartDirective) charts: BaseChartDirective;
  dataExport: any;
  graph: any;
  tableLabels: any;
  preData = [];
  preData1 = [];
  preData2 = [];
  prelabels = [];
  b = [];
  // constructor(private _tests: TestsMovilService) {
  //   this.getdata();
  // }
  constructor(private _tests:TestsMovilService,
     private _maquina: MachinesMovilService,
     private route:ActivatedRoute,
     private _graph: GraphsService,
     private toastr: ToastrService
     ) { }

  ngOnInit(): void {

    this.idtest=this.route.snapshot.paramMap.get("id")  
    this.getData(this.idtest);
  }

  getData(id) {
    this._tests.getTest(id)
      .subscribe(data => {
console.log(data['status'])
        if(data['status']==200){
          this.dataExport=data['content']
          this.test=data['content'].content;
        this.name=data['content'].name;
        console.log("datos de la bd", this.name)
        data = data['content'].infoResult
        let labelx = "SNR"
        let tbdatos = " err0"
        let tbdatos1 = " err1"
        let tbdatos2 = " err2"
        console.log("datoosxx", data)

        for (let index in data) {
          const dato = data[index];
          // console.log("for",dato[" err0"])   
          //  var rep= Math.round(dato[labelx])
          this.prelabels.push(dato[labelx])
          // this.prelabels.push(rep)         
          this.preData.push(dato[tbdatos] / 1000)
          this.preData1.push(dato[tbdatos1] / 1000)
          this.preData2.push(dato[tbdatos2] / 1000)
          // this.b= this.prelabels.filter( this.onlyUnique);
          this.b = [1, 2, 3, 4, 5, 6, 7, 8]
          // console.log(this.prelabels)
          // console.log(this.b)
        }
        }else{
          this.toastr.info("No tiene resultados");

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
    {
      data: this.preData,
      label: this.name,
      fill: false,
      borderWidth: 2,

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
    plugins:{
      zoom: {
        zoom: {
            enabled: true,
            drag: true,
            mode: 'xy',
          },
      }
    },
    fill: false,
    datasetFill: false,
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'FER'
        },
      }],
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'SNR'
        },
        
        ticks: {
          beginAtZero: true,
          precision: 0,
          fixedStepSize: 1,
          distribution: 'lineal',
          maxRotation: 0,
          stepSize: 1,
          callback: function (value, index, values) {
            if (Math.trunc(value) == value) {
              return parseInt(value);
            }

          }
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
