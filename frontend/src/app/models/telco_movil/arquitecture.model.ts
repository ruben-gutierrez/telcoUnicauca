export  class Arquitecture {
    constructor(
        public _id:string,
        public name:string,
        public domain:string,
        public type:string,
        public maxRAM: number,
        public maxCore: number,
        public maxVM: number,
        public maxHDD: number,
        public status: string

    ){  }
    
}