export class BillingDetails {
    constructor(
        public firstName:string,
        public lastName:string,
        public street:string,
        public city:string,
        public postcode:number,
        public phone:string,
        public email:string,
        public userId:string,
    ){}
}