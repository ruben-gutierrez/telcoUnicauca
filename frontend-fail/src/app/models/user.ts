export  class User {
    constructor(_id='', name='', password='', role=''){
        this._id=_id;
        this.name=name;
        this.password= password;
        this.role=role;
    }
    _id:string;
    name:string;
    password:string;
    role:string;
}
