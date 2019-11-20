import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ims',
  templateUrl: './ims.component.html',
  styles: []
})
export class IMSComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
