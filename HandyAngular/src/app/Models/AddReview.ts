export class AddReview {
    constructor(
        public userId:string,
        public content:string,
        public productId:number,
        public rating :number,
    ){}
}