import { Component, OnInit } from '@angular/core'; 
import { TestsMovilService, } from 'src/app/services/services.index';
import { isUndefined } from 'util';
import { GraphmovilTemplateComponent } from '../../graficastelcomovil/graphmovil-template/graphmovil-template.component';
import { NewServerComponent } from '../../../ims/arquitectures/arquitecture/new-server/new-server.component';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import 'chartjs-plugin-zoom';
import { GraficastelcomovilComponent } from '../../graficastelcomovil/graficastelcomovil.component';
import { ActivatedRoute } from "@angular/router";
import { GraphsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-resultadomovil',
  templateUrl: './resultadomovil.component.html',
  styleUrls: ['./resultadomovil.component.css']
})
export class ResultadomovilComponent implements OnInit {
  idGraph=null;
  data = {}
  constructor( private _tests:TestsMovilService) { }

  ngOnInit(): void {
    this._tests.getdata('1')
    .subscribe( data =>{
      // console.log(data)
      this.data = data;
    })

  }

}
