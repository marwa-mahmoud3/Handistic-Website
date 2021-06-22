export class SellerReview {
    constructor(
        public userId:string,
        public content:string,
        public sellerId:string,
        public rating :number,
    ){}
}