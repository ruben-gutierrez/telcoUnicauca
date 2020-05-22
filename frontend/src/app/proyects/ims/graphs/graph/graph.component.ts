import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GraphsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  idGraph=1
  graph:any;
  idArquitecture='5e2f230ee1006b17adbcd763'
  constructor(private activateRoute: ActivatedRoute,
              private _graph: GraphsService) {
    this.activateRoute.params
      .subscribe(params=>{
        this.idGraph=params.id
      })

      this._graph.getGraph(this.idGraph)
        .subscribe( data=>{
          this.graph=data['content']
        })

   }

  ngOnInit() {

  }
}
