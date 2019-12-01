export  class Arquitecture {
    constructor(_id='', name='', domain='', type='', maxRAM='', maxVM='', maxCore='', maxHDD='', status=''){
        this._id=_id;
        this.name=name;
        this.domain= domain;
        this.type=type;
        this.maxRAM=maxRAM;
        this.maxVM=maxVM;
        this.maxCore=maxCore;
        this.maxHDD=maxHDD;
        this.status=status;
    }
    _id:string;
    name:string;
    domain:string;
    type:string;
    maxRAM: string;
    maxCore: string;
    maxVM: string;
    maxHDD: string;
    status: string

}


// {
// 	"name":"arq7",
// 	"domain": "7",
// 	"type": "2",
// 	"maxRAM": "1",
// 	"maxCore": "users",
// 	"maxVM": "running",
// 	"maxHDD": "running",
// 	"vmCoreIMS": [{ "id":"123", "name":"bono"},{ "id":"12345", "name":"sprout"}],
// 	"vmAditionals":[{ "id":"123", "name":"bono"},{ "id":"12345", "name":"sprout"}],
// 	"tests":[{ "id":"123", "name":"proxy"},{ "id":"12345", "name":"user"},{ "id":"123", "name":"proxy2"},{ "id":"123", "name":"proxy3"}],
// 	"graphs":[{ "id":"123", "name":"ram"},{ "id":"12345", "name":"disk"}],
// 	"status": "public"
// }