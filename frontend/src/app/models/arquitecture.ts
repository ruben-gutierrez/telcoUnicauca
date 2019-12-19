export  class Arquitecture {
    constructor(_id='', name='', domain='', type='', maxRAM=0, maxVM=0, maxCore=0, maxHDD=0, status=''){
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
    maxRAM: number;
    maxCore: number;
    maxVM: number;
    maxHDD: number;
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