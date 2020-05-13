export  class Test {
    constructor(_id='', name='', description='', type='', file='', idArquitecture='', descriptionUser='', notes='', status=''){
        this._id=_id;
        this.name=name;
        this.description= description;
        this.type=type;
        this.file=file;
        this.idArquitecture=idArquitecture;
        this.descriptionUser=descriptionUser;
        this.notes=notes;
        this.status=status;
    }
    _id:string;
    name:string;
    description:string;
    type:string;
    file: string;
    descriptionUser: string;
    idArquitecture: string;
    notes: Object;
    status: string
}
