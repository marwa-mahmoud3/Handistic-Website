export class Product {
    constructor(
        public productName:string,
        public details:string,
        public unitPrice:number,
        public quantity : number,
        public productImagePath : string,
        public size : string,
        public categoryId : number 
    ){}
}