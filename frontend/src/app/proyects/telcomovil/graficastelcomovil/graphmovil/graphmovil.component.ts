import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GraphsService } from 'src/app/services/services.index';
@Component({
  selector: 'app-graphmovil',
  templateUrl: './graphmovil.component.html',
  styleUrls: ['./graphmovil.component.css']
})
export class GraphmovilComponent implements OnInit {
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
    setInterval(() => {
      console.log("actualizando grafica")
      this._graph.getGraph(this.idGraph)
        .subscribe( data=>{
          this.graph=data['content']
        })
    }, 60000);

  }
}
