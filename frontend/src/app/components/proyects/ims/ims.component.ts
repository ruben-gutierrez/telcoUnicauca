import { Component, OnInit } from '@angular/core';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-ims',
  templateUrl: './ims.component.html',
  styleUrls: ['./ims.component.css']
})
export class ImsComponent implements OnInit {
  tittles = [

     
    // {
    //   "tittle":"Introduccion",
    //   "content": [
    //     { "subtittle":"subtitle 1" },
    //     {"text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloribus minus ducimus ad voluptate amet rerum. Quod tempora blanditiis odit neque minus enim recusandae, quaerat, voluptatum sit quibusdam veritatis suscipit.0"},
    //     {"text2": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloribus minus ducimus ad voluptate amet rerum. Quod tempora blanditiis odit neque minus enim recusandae, quaerat, voluptatum sit quibusdam veritatis suscipit.0"},
    //     {"img": "assets/images/info/img1.png"},
    //     {"video":"assets/video/info/video2.mp4"}
    //   ]
    // },
    {
      "tittle":"Introduccion",
      "content": {
        "subtittle":"subtitle 1" ,
        "text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloribus minus ducimus ad voluptate amet rerum. Quod tempora blanditiis odit neque minus enim recusandae, quaerat, voluptatum sit quibusdam veritatis suscipit.0",
        "text2": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloribus minus ducimus ad voluptate amet rerum. Quod tempora blanditiis odit neque minus enim recusandae, quaerat, voluptatum sit quibusdam veritatis suscipit.0",
        "img": "assets/images/info/img1.png",
        "video":"assets/video/info/video2.mp4"
      }
      
    },
    {
      "tittle":"Introduccion",
      "content": {
        "subtittle":"subtitle 1" ,
        "text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloribus minus ducimus ad voluptate amet rerum. Quod tempora blanditiis odit neque minus enim recusandae, quaerat, voluptatum sit quibusdam veritatis suscipit.0",
        "text2": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloribus minus ducimus ad voluptate amet rerum. Quod tempora blanditiis odit neque minus enim recusandae, quaerat, voluptatum sit quibusdam veritatis suscipit.0",
        "img": "assets/images/info/img1.png",
        "video":"assets/video/info/video2.mp4"
      }
    },
    
   
    
  ];
  constructor( private _user: UsersService,
              private _arquitecture:ArquitectureService) { }

  ngOnInit() {
    this._arquitecture.getArquitectures()
    .subscribe( data=>{
      // this.arquitectures=data;
      this._arquitecture.arquitectures = this.arqReserved(data, this._user.userActive._id);
      this._arquitecture.freeArquitectures=this.arqFree(data);
      // console.log(data);
      
    })
    
  }
  arqReserved(arquitectures, idUser) {

    return arquitectures.filter(function(arq){
      // console.log(arq);
      return arq.status == idUser;
    })
  }
  arqFree(arquitectures) {

    return arquitectures.filter(function(arq){
      // console.log(arq);
      return arq.status == 'public';
    }
    )
  }
  
  

}
