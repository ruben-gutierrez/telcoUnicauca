import { now } from "moment";

export  class Graph {
    constructor(_id, name, idServer, idTemplate, created_at,infocacti){
        this._id=_id;
        this.name=name;
        this.idServer= idServer;
        this.idTemplate=idTemplate;
        this.created_at=created_at;
        this.infoCacti=infocacti;
    }
    _id:string;
    name:string;
    idServer: string;
    idTemplate: string;
    created_at: Date;
    infoCacti: object
}



  
   
