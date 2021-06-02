export class Product {
    constructor(
        public Id:number,
        public ProductName:string,
        public Details:string,
        public UnitPrice:number,
        public Quantity : number,
        public ProductImagePath : string,
        public Size : string,
        public CategoryId : number 
    ){}
}