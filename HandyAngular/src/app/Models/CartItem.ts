export class CartItem {
    constructor(
        public id:number,
        public quantity:number,
        public unitPrice:number,
        public totalPrice:number,
        public productId:number,
        public cartId:number,
    ){}
}